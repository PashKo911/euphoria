import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import useHttp from '../../hooks/useHttp'
import ButtonPurple from '../../components/buttons/ButtonPurple'

import styles from './auth.module.scss'
import { useAuth } from '../../context/AuthContext'

const Auth = (props) => {
	const {
		title,
		subtitle,
		route,
		redirectRoute,
		buttonText,
		imgPath,
		isSignIn,
		subButtonText,
		subButtonSpan,
		subButtonRoute,
	} = props

	const [isPassHide, setIsPassHide] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const { login } = useAuth()
	const { post, process } = useHttp()

	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()

		const form = e.target
		const formData = {
			email: form.email.value,
			password: form.password.value,
		}

		try {
			const data = await post(`${route}`, formData, false)
			console.log(data)
			login(data.token, data.user)
			navigate(`${redirectRoute}`)
		} catch (error) {
			setErrorMessage(error)
		}
	}

	return (
		<section className={styles.auth}>
			<div className={styles.wrapper}>
				<div className={styles.img}>
					<img src={imgPath} alt="Sign in image" />
				</div>
				<div className={styles.content}>
					<div className={styles.header}>
						<h1 className={styles.title}>{title}</h1>
						{!isSignIn && <h2 className={styles.subtitle}>{subtitle}</h2>}
					</div>
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
					<form className={styles.form} onSubmit={handleLogin}>
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
								<button type="button" className={styles.button} onClick={() => setIsPassHide(!isPassHide)}>
									{isPassHide ? <FaEyeSlash /> : <FaEye />}
									<span> {isPassHide ? 'Hide' : 'Show'} </span>
								</button>
							</label>
							<input
								className={styles.input}
								id="password"
								type={isPassHide ? 'text' : 'password'}
								name="password"
								required
							/>
						</div>
						{isSignIn && (
							<Link className={styles.forget} to={'#'}>
								Forget your password
							</Link>
						)}

						<ButtonPurple
							style={{ width: 'max-content', minWidth: 167, marginBottom: 10 }}
							title={buttonText}
							isLoading={process}
							disabled={process === 'loading' ? true : false}
						/>
						<Link className={styles.signup} to={subButtonRoute}>
							{subButtonText} <span>{subButtonSpan}</span>
						</Link>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Auth
