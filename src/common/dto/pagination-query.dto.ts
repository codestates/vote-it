import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  offset: number | undefined;

  @IsNumber()
  @IsPositive()
  @Max(30)
  @Type(() => Number)
  limit: number;
}
