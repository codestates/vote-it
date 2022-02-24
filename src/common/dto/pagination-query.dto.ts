import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

function stringToNumeric(value: string) {
  const valueIsNumeric = /^-?\d+$/.test(value);
  return valueIsNumeric ? parseInt(value, 10) : value;
}

export class PaginationQueryDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => stringToNumeric(value))
  offset = 0;

  @IsInt()
  @IsPositive()
  @Max(30)
  @Transform(({ value }) => stringToNumeric(value))
  @Type(() => Number)
  limit: number;
}
