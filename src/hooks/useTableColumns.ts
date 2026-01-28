import { ReactNode } from "react";

// In src/hooks/useTableColumns.ts
export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => ReactNode;
  className?: string;
  width?: string | number; // Add this line
}

export function useTableColumns<T>() {
  const createColumn = <K extends keyof T>(
    id: string,
    header: string,
    options: {
      accessorKey?: K;
      cell?: (item: T, index: number) => ReactNode;
      className?: string;
      width?: string | number; // Add this line
    } = {},
  ): ColumnDef<T> => {
    return {
      id,
      header,
      accessorKey: options.accessorKey,
      cell: options.cell,
      className: options.className,
      width: options.width, // Add this line
    };
  };

  return { createColumn };
}
