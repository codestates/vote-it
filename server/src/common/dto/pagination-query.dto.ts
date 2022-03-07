import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { NumericTransform } from '../decorators/numeric-transform.decorator';

export class PaginationQueryDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  @NumericTransform()
  offset = 0;

  @IsInt()
  @IsPositive()
  @Max(30)
  @NumericTransform()
  limit: number;
}
