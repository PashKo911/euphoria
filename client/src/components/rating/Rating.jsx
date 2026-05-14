import React, { useState, useEffect } from 'react'

import styles from './rating.module.scss'

const Rating = ({ initialRating = 3.5 }) => {
	const [rating, setRating] = useState(initialRating)

	useEffect(() => {
		setRating(initialRating)
	}, [initialRating])

	const getStarStyles = (index) => {
		const fullStars = Math.floor(rating)
		const partialStar = rating - fullStars
		if (index < fullStars) {
			return { width: '100%' }
		}
		if (index === fullStars && partialStar > 0) {
			return { width: `${partialStar * 100}%` }
		}
		return { width: '0%' }
	}

	return (
		<div className={styles.rating} data-rating={rating}>
			<div className={styles.items}>
				{Array.from({ length: 5 }, (_, index) => (
					<label key={index} className={styles.item}>
						<input
							className={styles.input}
							type="radio"
							name="rating"
							value={index + 1}
							// checked={rating === index + 1}
							// onChange={handleRatingChange}
						/>
						<span style={getStarStyles(index)}></span>
					</label>
				))}
			</div>
			<div className={styles.value}>{rating}</div>
		</div>
	)
}

export default Rating
