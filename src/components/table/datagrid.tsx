import { Sheet, Table } from '@mui/joy';
import { ColumnType } from './table.types';
import TableHead from './table-head';
import TableBody from './table-body';

interface Props {
  rows: any[];
  columns: ColumnType[];
}

export default function Datagrid({ rows, columns }: Props) {
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: 'md',
        overflow: 'auto',
      }}
    >
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
    </Sheet>
  );
}
