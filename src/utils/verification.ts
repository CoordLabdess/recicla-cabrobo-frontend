export function isEmailValid(email: string) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? true : false
}

export function isPasswordLong(password: string) {
	return password.trim().length >= 6 ? true : false
}
