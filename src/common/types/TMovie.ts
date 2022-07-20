import TObject from './TObject';

type TMovie = TObject & {
	id: string;
	poster_path?: string;
	title: string;
};

export default TMovie;
