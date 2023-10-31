import { Table } from '@mui/joy';

interface Props {
  children?: React.ReactNode;
  headerColumns: any[];
}

const tableColumnStyle = {
  width: 100,
  textAlign: 'center' as const,
  verticalAlign: 'middle' as const,
};

const PatientsTable = ({ children, headerColumns }: Props) => {
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
      <thead>
        <tr>
          {headerColumns.map((header: any) => (
            <th style={tableColumnStyle} key={`${header}-head-study-types-table`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      {children}
    </Table>
  );
};

export default PatientsTable;
