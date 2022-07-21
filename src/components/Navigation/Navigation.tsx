import { TObject } from 'common/types';
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getLists, selectLists } from 'redux/tmdb';
import { deleteSession, isLoggedIn } from 'services/tmdb';

function Navigation(): JSX.Element {
	const navigateTo = useNavigate();
	const location = useLocation();
	const searchButton = useRef<HTMLButtonElement>(null);
	const listsButton = useRef<HTMLButtonElement>(null);
	const dispatch = useAppDispatch();
	const lists = useAppSelector(selectLists);

	useEffect(() => {
		const toggleButtons = () => {
			if (!isLoggedIn()) return;
			const route = location.pathname.slice(1);
			const routes = { search: searchButton, lists: listsButton } as TObject;
			Object.keys(routes).forEach((key) => {
				routes[key].current.disabled = key === route;
			});
		};
		toggleButtons();
	}, [location.pathname]);

	useEffect(() => {
		if (lists.length) return;
		dispatch(getLists());
	}, [dispatch, lists.length]);

	const logOut = async () => {
		await deleteSession();
		navigateTo('/');
	};

	return (
		<>
			{isLoggedIn() && (
				<nav>
					<button ref={searchButton} onClick={() => navigateTo('search')}>
						Pesquisar
					</button>
					<button ref={listsButton} onClick={() => navigateTo('lists')}>
						Listas
					</button>
					<button onClick={logOut}>Log Out</button>
				</nav>
			)}
		</>
	);
}

export default Navigation;
