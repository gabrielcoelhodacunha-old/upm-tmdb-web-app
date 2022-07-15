import { Navigate, Outlet } from 'react-router-dom';
import TRoute from 'routes/TRoute';
import { isLoggedIn } from 'services/tmdb';
import LoginRoute from './login';

function Public(): JSX.Element {
	return isLoggedIn() ? <Navigate to='/' /> : <Outlet />;
}

const PublicRoutes: TRoute = {
	element: <Public />,
	children: [LoginRoute],
};

export default PublicRoutes;
