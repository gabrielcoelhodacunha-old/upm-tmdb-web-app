import TObject from './TObject';

type TList = TObject & {
	id: number;
	name: string;
	description: string;
	items: any[];
};

export default TList;
