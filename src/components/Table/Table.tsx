import TableBody from './TableBody';
import TableHead from './TableHead';

function Table({ data, columns }: Props): JSX.Element {
	let rowNumber = 0;

	const headProps = { columns };
	const bodyProps = { data, columns, rowNumber };
	return (
		<table>
			<TableHead {...headProps} />
			<TableBody {...bodyProps} />
		</table>
	);
}

type Props = {
	data: any[];
	columns: string[];
};

export default Table;
