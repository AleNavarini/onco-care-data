import { ColumnType } from './table.types';

interface TableRowProps {
  row: any;
  columns: ColumnType[];
}

export default function TableRow({ row, columns }: TableRowProps) {
  return (
    <tr key={row.id}>
      {columns.map((column) => (
        <td
          key={`table-cell-${column.field}`}
          style={
            column.style
              ? column.style
              : { textAlign: 'center', verticalAlign: 'middle' }
          }
        >
          {column.renderCell ? column.renderCell(row) : row[column.field]}
        </td>
      ))}
    </tr>
  );
}
