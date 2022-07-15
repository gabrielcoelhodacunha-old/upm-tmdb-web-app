function TableBody({ data, columns }: Props): JSX.Element {
	return (
		<tbody>
			{data.map((row, index) => (
				<tr key={`row-${index}`}>
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
};

export default TableBody;
