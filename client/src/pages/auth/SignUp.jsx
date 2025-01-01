import Auth from './Auth'

const data = {
	title: 'Sign Up',
	imgPath: '/assets/img/auth/signUp.png',
	subtitle: 'Sign up for free to access to in any of our products ',
	isSignIn: false,
	redirectRoute: '/products',
	buttonText: 'Sign Up',
	subButtonText: 'Already have an  account?',
	subButtonSpan: 'Log in',
	subButtonRoute: '/auth/sign-in',
	route: '/auth/sign-up',
}

const SignUp = () => {
	return <Auth {...data} />
}

export default SignUp
