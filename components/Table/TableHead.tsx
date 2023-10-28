interface Props {
  columns: any[];
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
                key={column.field}
                style={{ width: column.width, padding: 12, zIndex: 1 }}
              >
                {column.headerName}
              </th>
            );
          })}
      </tr>
    </thead>
  );
}
