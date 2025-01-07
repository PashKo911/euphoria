import Auth from './Auth'

const data = {
	title: 'Sign In Page',
	imgPath: '/assets/img/auth/signIn.png',
	isSignIn: true,
	redirectRoute: '/products?gender=men',
	buttonText: 'Sign In',
	subButtonText: 'Don’t have an account?',
	subButtonSpan: 'Sign up',
	subButtonRoute: '/auth/sign-up',
	route: '/auth/sign-in',
}

const SignIn = () => {
	return <Auth {...data} />
}

export default SignIn
