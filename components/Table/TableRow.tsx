import { ColumnType } from './table.types';

interface TableRowProps {
  row: any;
  columns: ColumnType[];
  edit?: React.ReactNode;
  del?: React.ReactNode;
}

export default function TableRow({ row, columns, edit, del }: TableRowProps) {
  return (
    <tr key={row.id}>
      {columns.map((column, index) => (
        <td
          key={`table-cell-${column.field}-${index}`}
          style={{ textAlign: 'center' }}
        >
          {column.renderCell ? column.renderCell(row) : row[column.field]}
        </td>
      ))}
      {edit}
      {del}
    </tr>
  );
}
