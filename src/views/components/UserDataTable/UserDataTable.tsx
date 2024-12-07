interface TableProps {
  headers: string[];
  rows: Array<Record<string, string | number | boolean>>;
}

export const Table = ({ headers, rows }: TableProps) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              style={{
                padding: '8px',
                textAlign: 'left',
                borderBottom: '1px solid #ddd',
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td
                key={header}
                style={{ padding: '8px', borderBottom: '1px solid #ddd' }}
              >
                {row[header.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
