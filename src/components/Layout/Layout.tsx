import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { store } from 'redux/store';
import { Navigation, Header } from '..';

function Layout(): JSX.Element {
	return (
		<Provider store={store}>
			<Header />
			<Navigation />
			<main>
				<Outlet />
			</main>
		</Provider>
	);
}

export default Layout;
