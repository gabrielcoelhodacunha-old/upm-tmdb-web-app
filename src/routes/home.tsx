import { Navigate } from 'react-router-dom';
import { Layout } from '../components';
import ListsRoute from './lists';
import LoginRoute from './login';
import SearchRoute from './search';
import TRoute from './TRoute';

const isLogged = true;

const IndexRoute: TRoute = {
	element: isLogged ? <Navigate to='search' /> : <Navigate to='login' />,
	index: true,
};

const HomeRoute: TRoute = {
	element: <Layout />,
	path: '/',
	children: [IndexRoute, LoginRoute, SearchRoute, ListsRoute],
};

export default HomeRoute;
