import { useEffect, useRef } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

type TObject = { [key: string]: any };

function NavigationContainer(): JSX.Element {
	const navigateTo = useNavigate();
	const location = useLocation();
	const routes = { search: useRef(null), lists: useRef(null) } as TObject;

	useEffect(() => {
		const route = location.pathname.split('/')[1];
		Object.keys(routes).forEach(
			(key) => (routes[key].current.disabled = key === route)
		);
	});

	return (
		<div id='pesquisar_ou_listas'>
			<button ref={routes.search} onClick={() => navigateTo('search')}>
				Pesquisar
			</button>
			<button ref={routes.lists} onClick={() => navigateTo('lists')}>
				Listas
			</button>
			<Outlet />
		</div>
	);
}

export default NavigationContainer;
