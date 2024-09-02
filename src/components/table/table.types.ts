import { CSSProperties } from 'react';

export type Comparator<T> = (a: T, b: T) => number;
export type ComparatorKey<T> = keyof T | Comparator<T>;
export type ComparatorFn<T> = (a: T, b: T) => number;

export type Order = 'asc' | 'desc' | null;

export type SortType<T> = {
  order: Order;
  orderBy: string | null;
};

export type ColumnType = {
  headerName: string | (() => React.ReactNode);
  field: string;
  sortable?: boolean;
  filter?: boolean;
  width?: number;
  padding?: number;
  hidden?: boolean;
  style?: CSSProperties;
  renderCell?: (row: any) => React.ReactNode;
};
