export class PaginationResponseDto {
  readonly data: Array<any>;
  readonly count: number;
  readonly extraData: object;

  constructor(data, count, extraData?) {
    this.data = data;
    this.count = count;
    this.extraData = extraData;
  }
}
