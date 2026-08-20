import { Injectable } from '@nestjs/common';

export type ClasseFluido = 'A' | 'B' | 'C' | 'D';
export type CategoriaVaso = 'I' | 'II' | 'III' | 'IV' | 'V';
export type CategoriaCaldeira = 'A' | 'B';
export type GrupoPotencialRisco = 1 | 2 | 3 | 4 | 5;

const CATEGORIA_MATRIX: Record<ClasseFluido, Record<GrupoPotencialRisco, CategoriaVaso>> = {
  A: { 1: 'I', 2: 'I', 3: 'II', 4: 'III', 5: 'III' },
  B: { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'IV' },
  C: { 1: 'II', 2: 'III', 3: 'IV', 4: 'V', 5: 'V' },
  D: { 1: 'III', 2: 'IV', 3: 'V', 4: 'V', 5: 'V' },
};

const TENSAO_ADMISSIVEL: Record<string, number> = {
  'Aço Carbono': 1203.3,
  'Aço Inoxidável 304': 1400,
  'Aço Inoxidável 316L': 1450,
  'Aço Liga': 1600,
  'Aço Carbono c/ Revestimento': 1200,
};

@Injectable()
export class Nr13Service {
  /** Produto P.V (MPa·m³) — aplicabilidade da NR-13 (> 8) */
  calcularPV(pressaoKpa: number, volumeM3: number): number {
    return pressaoKpa * volumeM3;
  }

  obterGrupoPotencialRisco(pv: number): GrupoPotencialRisco | null {
    if (pv >= 100) return 1;
    if (pv >= 30) return 2;
    if (pv >= 10) return 3;
    if (pv >= 2.5) return 4;
    if (pv >= 1) return 5;
    return null;
  }

  classificarVaso(
    classeFluido: ClasseFluido,
    pressaoKpa: number,
    volumeM3: number,
  ): { categoria: CategoriaVaso; grupo: GrupoPotencialRisco } | null {
    if (classeFluido === 'A') {
      return { categoria: CATEGORIA_MATRIX['A'][1], grupo: 1 };
    }
    const pv = this.calcularPV(pressaoKpa, volumeM3);
    const grupo = this.obterGrupoPotencialRisco(pv);
    if (!grupo) return null;
    return { categoria: CATEGORIA_MATRIX[classeFluido][grupo], grupo };
  }

  classificarCaldeira(pressaoKpa: number): CategoriaCaldeira {
    return pressaoKpa >= 1960 ? 'A' : 'B';
  }

  periodicidadeInspecao(
    categoria: CategoriaVaso,
    temSPIE: boolean,
  ): { externo: number; interno: number } {
    const prazos: Record<CategoriaVaso, { externo: number; interno: number }> = {
      I: temSPIE ? { externo: 3, interno: 6 } : { externo: 1, interno: 3 },
      II: temSPIE ? { externo: 4, interno: 8 } : { externo: 2, interno: 4 },
      III: temSPIE ? { externo: 5, interno: 10 } : { externo: 3, interno: 6 },
      IV: temSPIE ? { externo: 6, interno: 12 } : { externo: 4, interno: 8 },
      V: temSPIE ? { externo: 7, interno: 14 } : { externo: 5, interno: 10 },
    };
    return prazos[categoria];
  }

  descricaoCategoria(categoria: CategoriaVaso): { nome: string; risco: string } {
    const mapa: Record<CategoriaVaso, { nome: string; risco: string }> = {
      I: { nome: 'Categoria I - Crítico', risco: 'Risco máximo. PLH com certificação SNQC.' },
      II: { nome: 'Categoria II - Alto', risco: 'Risco alto. PLH com CREA ativo.' },
      III: { nome: 'Categoria III - Moderado', risco: 'Risco moderado. PLH com CREA ativo.' },
      IV: { nome: 'Categoria IV - Baixo', risco: 'Risco baixo. PLH com CREA ativo.' },
      V: { nome: 'Categoria V - Mínimo', risco: 'Risco mínimo. PLH com CREA ativo.' },
    };
    return mapa[categoria];
  }

  descricaoClasseFluido(classe: ClasseFluido): string {
    const mapa: Record<ClasseFluido, string> = {
      A: "Inflamáveis, combustíveis >= 200°C, tóxicos <= 20 ppm",
      B: 'Combustíveis < 200°C, tóxicos > 20 ppm',
      C: "Vapor d'água, gases asfixiantes, ar comprimido",
      D: 'Demais fluidos não enquadrados',
    };
    return mapa[classe];
  }

  private eficienciaSolda(codigoProjeto: string): number {
    if (codigoProjeto.includes('API')) return 0.85;
    return 0.65; // ASME VIII Div.1 típico
  }

  private fatorTampoEliptico(alturaTampoMm: number | null, diametroInternoMm: number): number {
    if (!alturaTampoMm) return 1.0;
    const razao = diametroInternoMm / (2 * alturaTampoMm);
    return (1 / 6) * (2 + razao * razao);
  }

  /** PMTA = (S * E * e) / (R + 0.6 * e) — casco cilíndrico */
  calcularPMTACasco(
    material: string,
    codigoProjeto: string,
    diametroInternoMm: number | null,
    espessuraMedidaMm: number,
  ): number | null {
    const S = TENSAO_ADMISSIVEL[material] ?? 1200;
    const E = this.eficienciaSolda(codigoProjeto);
    if (!diametroInternoMm || diametroInternoMm <= 0) return null;
    const R = diametroInternoMm / 20; // mm → cm raio
    const e = espessuraMedidaMm / 10; // mm → cm
    return (S * E * e) / (R + 0.6 * e);
  }

  /** PMTA = (S * E * e) / (R * K + 0.1 * e) — tampo elíptico */
  calcularPMTATampoEliptico(
    material: string,
    codigoProjeto: string,
    diametroInternoMm: number | null,
    espessuraMedidaMm: number,
    alturaTampoMm: number | null,
  ): number | null {
    const S = TENSAO_ADMISSIVEL[material] ?? 1200;
    const E = this.eficienciaSolda(codigoProjeto);
    if (!diametroInternoMm || diametroInternoMm <= 0) return null;
    const R = diametroInternoMm / 20;
    const e = espessuraMedidaMm / 10;
    const K = this.fatorTampoEliptico(alturaTampoMm, diametroInternoMm);
    return (S * E * e) / (R * K + 0.1 * e);
  }

  descricaoInspecaoExtraordinaria(
    tipo: 'caldeira' | 'vaso',
  ): { inatividade: number; descricao: string } {
    if (tipo === 'caldeira') {
      return { inatividade: 6, descricao: 'Inatividade superior a 6 meses' };
    }
    return { inatividade: 12, descricao: 'Inatividade superior a 12 meses' };
  }
}
