import { Navigate } from 'react-router-dom';
import { Layout } from 'components';
import TRoute from './TRoute';
import PublicRoutes from './public';
import PrivateRoutes from './private';

const IndexRoute: TRoute = {
	element: <Navigate to='search' />,
	index: true,
};

const HomeRoute: TRoute = {
	element: <Layout />,
	path: '/',
	children: [IndexRoute, PublicRoutes, PrivateRoutes],
};

export default HomeRoute;
