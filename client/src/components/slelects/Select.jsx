import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'

import styles from './select.module.scss'

const Select = ({
	options,
	placeholder = 'Select an option',
	onChange,
	isLoading = false,
	resetValues = false,
	value = null,
	styles: customStyles,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState(null)
	const selectRef = useRef(null)

	useEffect(() => {
		if (resetValues) {
			setSelectedOption(null)
		}
		if (value?.value) {
			setSelectedOption(value)
		}
		const handleClickOutside = (event) => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [value, resetValues])

	const selectOption = (option) => {
		setSelectedOption(option)
		setIsOpen(false)
		onChange && onChange(option)
	}

	return (
		<div className={styles.select} ref={selectRef} style={customStyles}>
			<div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
				{isLoading === 'loading' ? (
					<FaSpinner className={styles.spinner} />
				) : (
					<>
						{selectedOption ? selectedOption.label : placeholder}
						<MdOutlineKeyboardArrowDown />
					</>
				)}
			</div>

			{isOpen && (
				<ul className={styles.selectList}>
					{options.map((option) => (
						<li key={option.value} className={styles.selectItem} onClick={() => selectOption(option)}>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Select

// const Select = ({
// 	options,
// 	placeholder = 'Select an option',
// 	onChange,
// 	isLoading = false,
// 	value = null,
// }) => {
// 	const [isOpen, setIsOpen] = useState(false)
// 	const selectRef = useRef(null)

// 	const selectOption = (option) => {
// 		setIsOpen(false)
// 		onChange && onChange(option.value)
// 	}

// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (selectRef.current && !selectRef.current.contains(event.target)) {
// 				setIsOpen(false)
// 			}
// 		}

// 		document.addEventListener('click', handleClickOutside)

// 		return () => {
// 			document.removeEventListener('click', handleClickOutside)
// 		}
// 	}, [])

// 	return (
// 		<div className={styles.select} ref={selectRef}>
// 			<div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
// 				{isLoading === 'loading' ? (
// 					<FaSpinner className={styles.spinner} />
// 				) : (
// 					<>
// 						{value ? value.label : placeholder}
// 						<MdOutlineKeyboardArrowDown />
// 					</>
// 				)}
// 			</div>

// 			{isOpen && (
// 				<ul className={styles.selectList}>
// 					{options.map((option) => (
// 						<li key={option.value} className={styles.selectItem} onClick={() => selectOption(option)}>
// 							{option.label}
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	)
// }
