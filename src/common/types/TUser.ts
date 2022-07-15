import TObject from './TObject';

type TUser = TObject & {
	username: string;
	password: string;
	apiKey: string;
};

export default TUser;
