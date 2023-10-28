interface Props {
  columns: any[];
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
                }}
              >
                {column.headerName}
              </th>
            );
          })}
      </tr>
    </thead>
  );
}
