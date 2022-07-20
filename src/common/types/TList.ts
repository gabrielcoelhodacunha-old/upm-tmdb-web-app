import TMovie from './TMovie';
import TObject from './TObject';

type TList = TObject & {
	id: string;
	name: string;
	description: string;
	items: TMovie[];
};

export default TList;
