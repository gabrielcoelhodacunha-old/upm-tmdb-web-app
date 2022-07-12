import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRoute from './home';
import TRoute from './TRoute';

const routes: TRoute[] = [HomeRoute];

function AppRouter(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>{routes.map((route, index) => renderRoute(route, index))}</Routes>
		</BrowserRouter>
	);
}

function renderRoute(
	{ element, path, index, children }: TRoute,
	key: number
): JSX.Element {
	return (
		<Route element={element} path={path} index={index} key={key}>
			{children
				? children.map((route, index) => renderRoute(route, index))
				: null}
		</Route>
	);
}

export default AppRouter;
