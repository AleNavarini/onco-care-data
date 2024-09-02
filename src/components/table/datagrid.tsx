import { ColumnType } from './table.types';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

interface Props {
  rows: any[];
  columns: ColumnType[];
}

export default function Datagrid({ rows, columns }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.field} className='text-center'>
              <p>
                {' '}
                {typeof column.headerName === 'string'
                  ? column.headerName
                  : column.headerName()}
              </p>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column: ColumnType) => (
              <TableCell
                key={column.field}
                className={column.className ? column.className : 'text-center'}
              >
                {column.renderCell ? column.renderCell(row) : row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
