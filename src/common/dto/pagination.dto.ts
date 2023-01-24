import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  offset?: number;
}
