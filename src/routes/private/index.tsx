import { Navigate, Outlet } from 'react-router-dom';
import TRoute from 'routes/TRoute';
import { isLoggedIn } from 'services/tmdb';
import ListsRoute from './lists';
import SearchRoute from './search';

const PrivateRoutes: TRoute = {
	element: <Private />,
	children: [SearchRoute, ListsRoute],
};

function Private(): JSX.Element {
	return isLoggedIn() ? <Outlet /> : <Navigate to='login' />;
}

export default PrivateRoutes;
