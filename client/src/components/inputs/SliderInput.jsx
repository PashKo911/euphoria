import React, { useState } from 'react'
import { useFilter } from '../../context/FilterProvider'
import { Range } from 'react-range'
import { v4 as uuidv4 } from 'uuid'

import styles from './sliderInput.module.scss'

const SliderInput = ({ min = 1, max = 1000 }) => {
	const { state, dispatch } = useFilter()
	const initialMin = state.price[0] ?? min
	const initialMax = state.price[1] ?? max
	const [values, setValues] = useState([initialMin, initialMax])

	const handleFinalChange = (values) => {
		dispatch({ type: 'SET_PRICE', payload: [...values] })
		dispatch({ type: 'SET_PAGE', payload: 0 })
	}

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
				onFinalChange={handleFinalChange}
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
