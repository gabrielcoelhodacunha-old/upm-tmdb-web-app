function TableHead({ columns }: Props): JSX.Element {
	return (
		<thead>
			<tr>
				{columns.map((column) => (
					<th key={`column-${column}`}>{column}</th>
				))}
			</tr>
		</thead>
	);
}

type Props = {
	columns: string[];
};

export default TableHead;
