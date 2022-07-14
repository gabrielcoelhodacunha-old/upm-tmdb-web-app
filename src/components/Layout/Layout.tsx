import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';

function Layout(): JSX.Element {
	return (
		<>
			<Header />
			<Navigation />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
