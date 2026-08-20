import { IsNumber, Min } from 'class-validator';

export class ClassificarCaldeiraDto {
  @IsNumber()
  @Min(0)
  pressaoKpa: number;
}
