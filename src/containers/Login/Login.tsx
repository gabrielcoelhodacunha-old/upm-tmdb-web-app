import { useRef } from 'react';
import { LabelledInput } from '../../components';

function LoginContainer() {
	const login = useRef(null);
	const password = useRef(null);
	const apiKey = useRef(null);

	const props = { type: 'password' };
	const loginProps = { ...props, label: 'Login', _ref: login };
	const passwordProps = { ...props, label: 'Password', _ref: password };
	const apiKeyProps = { ...props, label: 'Api Key', _ref: apiKey };

	const onClick = () => {
		localStorage.setItem('sessionId', '12345');
		[login, password, apiKey].forEach((i) => console.log(i.current));
	};

	return (
		<div id='login_container'>
			<LabelledInput {...loginProps} />
			<LabelledInput {...passwordProps} />
			<LabelledInput {...apiKeyProps} />
			<button onClick={onClick}>Login</button>
		</div>
	);
}

export default LoginContainer;
