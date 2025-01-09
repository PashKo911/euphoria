import React, { useState } from 'react'
import styles from './counter.module.scss'
const Counter = ({ initialValue = 1, min = 1, max = 1000 }) => {
	const [count, setCount] = useState(initialValue)

	const handleInputChange = (event) => {
		setCount(event.target.value)
	}
	const handleDecrement = () => {
		if (count > min) {
			setCount((prev) => prev - 1)
		}
	}
	const handleIncrement = () => {
		if (count < max) {
			setCount((prev) => prev + 1)
		}
	}

	const handleInputBlur = () => {
		const value = Number(count)
		if (value < min) {
			setCount(min)
		} else if (value > max) {
			setCount(max)
		}
	}

	return (
		<div className={styles.counter}>
			<button onClick={handleDecrement} className={styles.button} disabled={count === min}>
				<svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
					<path d="M10.2412 1L1 1" strokeWidth="1.03964" strokeLinecap="round" />
				</svg>
			</button>
			<label className={styles.label}>
				<input
					type="number"
					name="quantity"
					value={count}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					min={min}
					max={max}
					className={styles.value}
				/>
			</label>
			<button onClick={handleIncrement} className={styles.button} disabled={count === max}>
				<svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
					<path
						d="M5.86181 1.37939V10.6206M10.4824 6L1.24121 6"
						strokeWidth="1.03964"
						strokeLinecap="round"
					/>
				</svg>
			</button>
		</div>
	)
}

export default Counter
