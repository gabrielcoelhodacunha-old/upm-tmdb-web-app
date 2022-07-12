type TRoute = {
	element: JSX.Element;
	path?: string;
	index?: boolean;
	children?: TRoute[];
};

export default TRoute;
