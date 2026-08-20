import { IsBoolean, IsIn } from 'class-validator';

export class PeriodicidadeDto {
  @IsIn(['I', 'II', 'III', 'IV', 'V'])
  categoria: 'I' | 'II' | 'III' | 'IV' | 'V';

  @IsBoolean()
  temSPIE: boolean;
}
