import { Outlet } from 'react-router-dom';
import { Navigation, Header } from '..';

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
