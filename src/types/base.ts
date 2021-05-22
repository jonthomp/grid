import { Column, HeaderRendererProps } from '@supabase/react-data-grid';

export interface Dictionary<T> {
  [Key: string]: T;
}

export interface Sort {
  columnName: string;
  order: string;
}

export interface Filter {
  clause: string;
  columnName: string;
  condition: string;
  filterText: string;
}

export interface SavedState {
  filters: Filter[];
  gridColumns: Column<any, any>[];
  sorts: Sort[];
}

export interface DragItem {
  index: number;
  key: string;
}

export type ColumnType =
  | 'array'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'enum'
  | 'foreign_key'
  | 'json'
  | 'number'
  | 'primary_key'
  | 'text'
  | 'time'
  | 'unknown';

export interface ColumnHeaderProps<R> extends HeaderRendererProps<R> {
  columnType: ColumnType;
}
