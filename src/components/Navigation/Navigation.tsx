import { TObject } from 'common/types';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteSession } from 'services/tmdb';
import { getItem } from 'utils/localStorage';

function Navigation(): JSX.Element {
	const navigateTo = useNavigate();
	const location = useLocation();
	const routes = { search: useRef(null), lists: useRef(null) } as TObject;

	useEffect(() => {
		const route = location.pathname.slice(1);
		if (isLoginPage()) return;
		Object.keys(routes).forEach(
			(key) => (routes[key].current.disabled = key === route)
		);
	});

	const isLoginPage = useCallback(() => {
		const route = location.pathname.slice(1);
		return route === 'login';
	}, [location]);

	const logOut = async () => {
		await deleteSession(getItem('apiKey'), getItem('sessionId'));
		localStorage.clear();
		navigateTo('/');
	};
	return (
		<>
			{!isLoginPage() && (
				<nav>
					<button ref={routes.search} onClick={() => navigateTo('search')}>
						Pesquisar
					</button>
					<button ref={routes.lists} onClick={() => navigateTo('lists')}>
						Listas
					</button>
					<button onClick={logOut}>Log Out</button>
				</nav>
			)}
		</>
	);
}

export default Navigation;
