import TObject from './TObject';

type TUserData = TObject & {
	username: string;
	apiKey: string;
	sessionId: string;
};

export default TUserData;
