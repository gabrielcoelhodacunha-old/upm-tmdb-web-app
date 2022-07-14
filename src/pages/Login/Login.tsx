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

	const submit = () => {
		localStorage.setItem('sessionId', '12345');
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				submit();
			}}
		>
			<LabelledInput {...loginProps} />
			<LabelledInput {...passwordProps} />
			<LabelledInput {...apiKeyProps} />
			<button>Login</button>
		</form>
	);
}

export default LoginContainer;
