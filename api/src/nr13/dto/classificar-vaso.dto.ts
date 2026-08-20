import { IsIn, IsNumber, Min } from 'class-validator';

export class ClassificarVasoDto {
  @IsIn(['A', 'B', 'C', 'D'])
  classeFluido: 'A' | 'B' | 'C' | 'D';

  @IsNumber()
  @Min(0)
  pressaoKpa: number;

  @IsNumber()
  @Min(0)
  volumeM3: number;
}
