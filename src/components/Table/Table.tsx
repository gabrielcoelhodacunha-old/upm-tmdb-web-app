function Table(props: Props): JSX.Element {
	let rowNumber = 0;
	const { data, columns } = props;
	return (
		<table>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={`column-${column}`}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr key={`row-${rowNumber++}`}>
						{columns.map((column) => (
							<td key={`column-${column}`}>{row[column]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

type Props = {
	data: any[];
	columns: string[];
};

export default Table;
