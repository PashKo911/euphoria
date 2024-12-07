import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import styles from './auth.module.scss'
import ButtonPurple from '../../buttons/buttonPurple'

const Auth = () => {
	const [isHide, setIsHide] = useState(false)

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
							<img src="/assets/img/icons/twitter.svg" alt="Google" />
							<span>Continue With Twitter</span>
						</Link>
					</div>
					<div className={styles.or}>OR</div>

					<form className={styles.form}>
						<div className={styles.body}>
							<label className={styles.label} htmlFor="email">
								User name or email address
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
							path={'/auth/signin'}
							title={'Sign In'}
						/>
						<Link className={styles.signup} to={'/auth/register'}>
							Don’t have an account? <span>Sign up </span>
						</Link>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Auth
