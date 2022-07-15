import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'components';
import ListsRoute from './lists';
import LoginRoute from './login';
import SearchRoute from './search';
import TRoute from './TRoute';

function Protected(): JSX.Element {
	const isLoggedIn = () => {
		const sessionId = localStorage.getItem('sessionId') || '';
		return sessionId !== '';
	};

	if (!isLoggedIn()) return <Navigate to='login' />;
	return <Outlet />;
}

const ProtectedRoute: TRoute = {
	element: <Protected />,
	children: [SearchRoute, ListsRoute],
};

const IndexRoute: TRoute = {
	element: <Protected />,
	index: true,
};

const HomeRoute: TRoute = {
	element: <Layout />,
	path: '/',
	children: [IndexRoute, LoginRoute, ProtectedRoute],
};

export default HomeRoute;
