import { Body, Controller, Post } from '@nestjs/common';
import { Nr13Service } from './nr13.service.js';
import { ClassificarVasoDto } from './dto/classificar-vaso.dto.js';
import { ClassificarCaldeiraDto } from './dto/classificar-caldeira.dto.js';
import { PeriodicidadeDto } from './dto/periodicidade.dto.js';
import { PmtaCascoDto, PmtaTampoDto } from './dto/pmta.dto.js';

@Controller('nr13')
export class Nr13Controller {
  constructor(private readonly nr13: Nr13Service) {}

  @Post('classificar-vaso')
  classificarVaso(@Body() dto: ClassificarVasoDto) {
    const pv = this.nr13.calcularPV(dto.pressaoKpa, dto.volumeM3);
    const grupo = this.nr13.obterGrupoPotencialRisco(pv);
    const resultado = this.nr13.classificarVaso(dto.classeFluido, dto.pressaoKpa, dto.volumeM3);
    return {
      aplicaNr13: pv > 8,
      pv,
      grupo,
      categoria: resultado?.categoria ?? null,
      descricaoCategoria: resultado ? this.nr13.descricaoCategoria(resultado.categoria) : null,
      descricaoClasseFluido: this.nr13.descricaoClasseFluido(dto.classeFluido),
    };
  }

  @Post('classificar-caldeira')
  classificarCaldeira(@Body() dto: ClassificarCaldeiraDto) {
    const categoria = this.nr13.classificarCaldeira(dto.pressaoKpa);
    return { categoria, descricao: `Caldeira Categoria ${categoria}` };
  }

  @Post('periodicidade')
  periodicidade(@Body() dto: PeriodicidadeDto) {
    return this.nr13.periodicidadeInspecao(dto.categoria, dto.temSPIE);
  }

  @Post('pmta-casco')
  pmtaCasco(@Body() dto: PmtaCascoDto) {
    return { pmta: this.nr13.calcularPMTACasco(dto.material, dto.codigoProjeto, dto.diametroInternoMm, dto.espessuraMedidaMm) };
  }

  @Post('pmta-tampo')
  pmtaTampo(@Body() dto: PmtaTampoDto) {
    return { pmta: this.nr13.calcularPMTATampoEliptico(dto.material, dto.codigoProjeto, dto.diametroInternoMm, dto.espessuraMedidaMm, dto.alturaTampoMm) };
  }
}
