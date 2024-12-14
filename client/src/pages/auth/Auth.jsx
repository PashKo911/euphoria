import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import styles from './auth.module.scss'
import ButtonPurple from '../../components/buttons/ButtonPurple'
import RequestManager from '../../utils/RequestManager'

const Auth = () => {
	const [isHide, setIsHide] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const login = async (e) => {
		e.preventDefault()

		const form = e.target
		const formData = {
			email: form.email.value,
			password: form.password.value,
		}

		const callback = (data) => {
			console.log(data)
			localStorage.setItem('jwt_token', data.token)
		}

		setIsLoading(true)

		try {
			await RequestManager.doPostRequest('/auth/login', formData, '/products/men', callback, false)
		} catch (error) {
			console.log(error)
			setErrorMessage(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className={styles.auth}>
			<div className={styles.wrapper}>
				<div className={styles.img}>
					<img src="/assets/img/auth/signIn.png" alt="Sign in image" />
				</div>
				<div className={styles.content}>
					<h1 className={styles.title}>Sign In Page</h1>
					<div className={styles.links}>
						<Link to={'#'} className={styles.link}>
							<img src="/assets/img/icons/google.svg" alt="Google" />
							<span>Continue With Google</span>
						</Link>
						<Link to={'#'} className={styles.link}>
							<img src="/assets/img/icons/twitter.svg" alt="Twitter" />
							<span>Continue With Twitter</span>
						</Link>
					</div>
					<div className={styles.or}>OR</div>
					<form className={styles.form} onSubmit={login}>
						{errorMessage.length > 0 && (
							<div className={styles.error}>
								{errorMessage.map((error, index) => (
									<p key={index}>{error.message}</p>
								))}
							</div>
						)}
						<div className={styles.body}>
							<label className={styles.label} htmlFor="email">
								Email
							</label>
							<input
								className={styles.input}
								id="email"
								type="email"
								name="email"
								placeholder="designer@gmail.com"
								required
							/>
						</div>
						<div className={styles.body}>
							<label className={styles.password} htmlFor="password">
								<span>Password</span>
								<button type="button" className={styles.button} onClick={() => setIsHide(!isHide)}>
									{isHide ? <FaEyeSlash /> : <FaEye />}
									<span> {isHide ? 'Hide' : 'Show'} </span>
								</button>
							</label>
							<input
								className={styles.input}
								id="password"
								type={isHide ? 'text' : 'password'}
								name="password"
								required
							/>
						</div>
						<Link className={styles.forget} to={'#'}>
							Forget your password
						</Link>
						<ButtonPurple
							style={{ width: 'max-content', minWidth: 167, marginBottom: 10 }}
							title={isLoading ? 'Signing In...' : 'Sign In'}
							isLoading={isLoading}
							disabled={isLoading}
						/>
						<Link className={styles.signup} to={'/auth/login'}>
							Don’t have an account? <span>Sign up </span>
						</Link>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Auth
