import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  offset: number | undefined;

  @IsInt()
  @IsPositive()
  @Max(30)
  @Type(() => Number)
  limit: number;
}
