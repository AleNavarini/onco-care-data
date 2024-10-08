import TableRow from './table-row';
import { ColumnType } from './table.types';

interface TableBodyProps {
  rows: any[];
  columns: ColumnType[];
}

export default function TableBody({ rows, columns }: TableBodyProps) {
  return (
    <tbody>
      {rows.map((row: any, index: number) => (
        <TableRow key={`table-row-${index}`} row={row} columns={columns} />
      ))}
    </tbody>
  );
}
