import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type TObject = { [key: string]: any };

function NavigationContainer(): JSX.Element {
	const navigateTo = useNavigate();
	const location = useLocation();
	const routes = { search: useRef(null), lists: useRef(null) } as TObject;

	useEffect(() => {
		const route = location.pathname.split('/')[1];
		if (isLoginPage()) return;
		Object.keys(routes).forEach(
			(key) => (routes[key].current.disabled = key === route)
		);
	});

	const isLoginPage = useCallback(() => {
		const route = location.pathname.slice(1);
		return route === 'login';
	}, [location]);
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
				</nav>
			)}
		</>
	);
}

export default NavigationContainer;
