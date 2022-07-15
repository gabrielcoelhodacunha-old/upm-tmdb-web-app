function isLoggedIn() {
	const sessionId = localStorage.getItem('sessionId') || '';
	return sessionId !== '';
}

export default isLoggedIn;
