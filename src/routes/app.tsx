import { StrictMode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from '../App';
import {
	ListsContainer,
	LoginContainer,
	NavigationContainer,
	SearchContainer,
} from '../containers';

const isLogged = true;

function AppRoutes() {
	return (
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />}>
						<Route
							index
							element={
								isLogged ? <Navigate to='search' /> : <Navigate to='login' />
							}
						/>
						<Route path='login' element={<LoginContainer />} />
						<Route element={<NavigationContainer />}>
							<Route path='search' element={<SearchContainer />} />
							<Route path='lists' element={<ListsContainer />} />;
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</StrictMode>
	);
}

export default AppRoutes;
