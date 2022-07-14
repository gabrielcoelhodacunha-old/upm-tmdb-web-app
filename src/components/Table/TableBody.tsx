function TableBody({ data, columns, rowNumber }: Props): JSX.Element {
	return (
		<tbody>
			{data.map((row) => (
				<tr key={`row-${rowNumber++}`}>
					{columns.map((column) => (
						<td key={`column-${column}`}>{row[column]}</td>
					))}
				</tr>
			))}
		</tbody>
	);
}

type Props = {
	data: any[];
	columns: string[];
	rowNumber: number;
};

export default TableBody;
