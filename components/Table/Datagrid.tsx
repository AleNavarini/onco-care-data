import { Table } from '@mui/joy';
import { ColumnType } from './table.types';
import TableHead from './TableHead';
import TableBody from './TableBody';

interface Props {
  rows: any[];
  columns: ColumnType[];
}

export default function Datagrid({ rows, columns }: Props) {
  return (
    <Table
      stickyHeader
      hoverRow
      sx={{
        '--TableCell-headBackground': (theme) =>
          theme.vars.palette.background.level1,
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': (theme) =>
          theme.vars.palette.background.level1,
      }}
    >
      <TableHead columns={columns} />
      <TableBody rows={rows} columns={columns} />
    </Table>
  );
}
