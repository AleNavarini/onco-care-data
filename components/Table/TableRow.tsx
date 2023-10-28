import { ColumnType } from './table.types';

interface TableRowProps {
  row: any;
  columns: ColumnType[];
}

export default function TableRow({ row, columns }: TableRowProps) {
  return (
    <tr key={row.id}>
      {columns.map((column, index) => (
        <td key={`table-cell-${column.field}-${index}`} style={column.style}>
          {column.renderCell ? column.renderCell(row) : row[column.field]}
        </td>
      ))}
    </tr>
  );
}
