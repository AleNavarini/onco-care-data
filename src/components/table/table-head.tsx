import { ColumnType } from './table.types';

interface Props {
  columns: ColumnType[];
}

export default function TableHead({ columns }: Props) {
  return (
    <thead>
      <tr>
        {columns
          .filter((column) => !column.hidden)
          .map((column) => {
            return (
              <th
                key={`table-head-${column.field}`}
                style={{
                  width: column.width,
                  paddingLeft: 12,
                  paddingRight: 12,
                  zIndex: 1,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  ...column.style,
                }}
              >
                {typeof column.headerName === 'string'
                  ? column.headerName
                  : column.headerName()}
              </th>
            );
          })}
      </tr>
    </thead>
  );
}
