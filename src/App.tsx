import { Outlet } from 'react-router-dom';
import { Header } from './components';

function App(): JSX.Element {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

export default App;
