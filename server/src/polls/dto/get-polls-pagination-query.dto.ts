import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class GetPollsPaginationQueryDto extends PaginationQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  query?: string;
}
