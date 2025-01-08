export enum sort {
  ASC = "asc",
  DESC = "desc",
}

export interface Pagination {
  page: number;
  limit: number;
  sort: sort;
  sortBy: string;
}
