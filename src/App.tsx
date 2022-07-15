import { StrictMode } from 'react';
import { GlobalStyle } from 'assets/styles';
import AppRouter from 'routes/app';

function App(): JSX.Element {
	return (
		<StrictMode>
			<GlobalStyle />
			<AppRouter />
		</StrictMode>
	);
}

export default App;
