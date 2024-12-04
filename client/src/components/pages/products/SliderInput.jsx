import React, { useState } from 'react'
import { Range } from 'react-range'
import { v4 as uuidv4 } from 'uuid'

import styles from './sliderInput.module.scss'

const SliderInput = () => {
	const [values, setValues] = useState([100, 630])
	const max = 1000
	const min = 20

	const handleInputChange = (index, event) => {
		let value = event.target.value.slice(1)

		if ((index === 0 && value < 0) || (index === 1 && value > max)) {
			return
		}
		const newValues = [...values]
		newValues[index] = value
		setValues(newValues)
	}

	return (
		<>
			<Range
				step={1}
				min={min}
				max={max}
				values={values}
				onChange={(values) => {
					setValues(values)
				}}
				allowOverlap={false}
				renderTrack={({ props, children }) => {
					const { key, ...restProps } = props
					return (
						<div
							key="track"
							className={styles.range}
							{...restProps}
							style={{
								...props.style,
							}}>
							<div
								className={styles.zone}
								style={{
									left: `${(values[0] / max) * 100}%`,
									right: `${100 - (values[1] / max) * 100}%`,
								}}
							/>
							{children}
						</div>
					)
				}}
				renderThumb={({ props }) => {
					const { key, ...restProps } = props
					return (
						<div
							className={styles.marker}
							key={uuidv4()}
							{...restProps}
							style={{
								...props.style,
							}}
						/>
					)
				}}
			/>
			<div className={styles.wrapper} style={{ display: 'flex', justifyContent: 'space-between' }}>
				<input
					className={styles.input}
					type="text"
					name="minPrice"
					value={`$${values[0]}`}
					onChange={(e) => handleInputChange(0, e)}
				/>
				<input
					className={styles.input}
					type="text"
					name="maxPrice"
					value={`$${values[1]}`}
					onChange={(e) => handleInputChange(1, e)}
				/>
			</div>
		</>
	)
}

export default SliderInput
