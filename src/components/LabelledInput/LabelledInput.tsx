import { ChangeEvent, useId } from 'react';

function LabelledInput({ label, type, onChange }: Props): JSX.Element {
	const id = useId();
	const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
		onChange(event.target.value);
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} type={type} onChange={handleChange} />
		</div>
	);
}

type Props = {
	label: string;
	type?: string;
	onChange(value: string): void;
};

export default LabelledInput;
