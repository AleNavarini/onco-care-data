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
          .map((column, index) => {
            return (
              <th
                key={`table-head-${column.field}-${index}`}
                style={{
                  width: column.width,
                  padding: 12,
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
