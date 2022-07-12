import { Navigate } from 'react-router-dom';
import { Header } from '../components';
import LoginRoute from './login';
import NavigationRoute from './navigation';
import TRoute from './TRoute';

const isLogged = true;

const IndexRoute: TRoute = {
	element: isLogged ? <Navigate to='search' /> : <Navigate to='login' />,
	index: true,
};

const HomeRoute: TRoute = {
	element: <Header />,
	path: '/',
	children: [IndexRoute, LoginRoute, NavigationRoute],
};

export default HomeRoute;
