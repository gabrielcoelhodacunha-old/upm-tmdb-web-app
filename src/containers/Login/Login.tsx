import { useState } from 'react';
import { LabelledInput } from '../../components';

function LoginContainer() {
	const [user, setUser] = useState({ login: '', password: '', apiKey: '' });

	const setLogin = (login: string) => setUser({ ...user, login });
	const setPassword = (password: string) => setUser({ ...user, password });
	const setApiKey = (apiKey: string) => setUser({ ...user, apiKey });
	const props = { type: 'password' };
	const loginProps = { ...props, label: 'Login', onChange: setLogin };
	const passwordProps = { ...props, label: 'Password', onChange: setPassword };
	const apiKeyProps = { ...props, label: 'Api Key', onChange: setApiKey };

	const onClick = () => {
		localStorage.setItem('sessionId', '12345');
	};

	return (
		<div id='login_container'>
			<LabelledInput {...loginProps} />
			<LabelledInput {...passwordProps} />
			<LabelledInput {...apiKeyProps} />
			<button id='login_button' onClick={onClick}>
				Login
			</button>
		</div>
	);
}

export default LoginContainer;
