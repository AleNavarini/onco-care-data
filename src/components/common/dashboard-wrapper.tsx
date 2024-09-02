import { Sheet, Table } from '@mui/joy';
import { ReactNode } from 'react';

interface SheetTableProps {
  children: ReactNode;
}

const DashboardWrapper: React.FC<SheetTableProps> = ({ children }) => (
  <Sheet
    variant="outlined"
    sx={{
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: 'md',
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
      {children}
    </Table>
  </Sheet>
);

export default DashboardWrapper;
