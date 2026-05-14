import { useEffect, useMemo, useState } from 'react'

import styles from './serverWakeOverlay.module.scss'

const ServerWakeOverlay = ({ loading = false, duration = 50 }) => {
	const [secondsLeft, setSecondsLeft] = useState(duration)

	useEffect(() => {
		if (!loading) {
			setSecondsLeft(duration)
			return undefined
		}

		setSecondsLeft(duration)

		const intervalId = setInterval(() => {
			setSecondsLeft((currentValue) => {
				if (currentValue <= 0) {
					return 0
				}

				return currentValue - 1
			})
		}, 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [duration, loading])

	const progress = useMemo(() => {
		const passedSeconds = duration - secondsLeft
		return (passedSeconds / duration) * 100
	}, [duration, secondsLeft])

	if (!loading) {
		return null
	}

	return (
		<div className={styles.overlay} role="status" aria-live="polite" aria-label="Waking up the server">
			<div className={styles.panel}>
				<div className={styles.content}>
					<div className={styles.loader} aria-hidden="true">
						<div className={styles.spinner} />
						<div className={styles.ring} />
						<span className={styles.counter}>{secondsLeft}s</span>
					</div>

					<h2 className={styles.title}>Waking up the server...</h2>

					<p className={styles.description}>
						This project is hosted on a free Render instance. After inactivity, the server can take up to
						50 seconds to start again.
					</p>

					<div className={styles.progressTrack}>
						<div className={styles.progressBar} style={{ width: `${progress}%` }} />
					</div>

					<p className={styles.footer}>Thanks for waiting. The app should be available shortly.</p>
				</div>
			</div>
		</div>
	)
}

export default ServerWakeOverlay
