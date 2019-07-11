export interface QueryListArguments<TFilter> {
  skip?: number;
  take: number;
  filter?: Partial<TFilter>;
}
