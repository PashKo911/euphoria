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
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState(null)
	const selectRef = useRef(null)

	useEffect(() => {
		if (resetValues) {
			setSelectedOption(null)
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
	}, [resetValues])

	const selectOption = (option) => {
		setSelectedOption(option)
		setIsOpen(false)
		onChange && onChange(option)
	}

	return (
		<div className={styles.select} ref={selectRef}>
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
