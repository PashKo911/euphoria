import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import styles from './multiplySelect.module.scss'

const MultiplySelect = ({
	options,
	placeholder = 'Select an option',
	onChange,
	colors = false,
	isLoading = false,
	resetValues = false,
	value = [],
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState([])
	const selectRef = useRef(null)

	useEffect(() => {
		if (resetValues) {
			setSelectedOptions([])
		}
		if (value.length) {
			setSelectedOptions(value)
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
		let newSelectedOptions
		if (selectedOptions.some((item) => item.value === option.value)) {
			newSelectedOptions = selectedOptions.filter((item) => item.value !== option.value)
		} else {
			newSelectedOptions = [...selectedOptions, option]
		}

		setSelectedOptions(newSelectedOptions)

		const selectedIds = newSelectedOptions.map((item) => item.value)
		onChange && onChange(selectedIds)
	}

	return (
		<div className={styles.select} ref={selectRef}>
			<div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
				{isLoading === 'loading' ? (
					<FaSpinner className={styles.spinner} />
				) : (
					<>
						{selectedOptions.length > 0 ? selectedOptions.map((item) => item.label).join(', ') : placeholder}
						<MdOutlineKeyboardArrowDown />
					</>
				)}
			</div>

			{isOpen && (
				<ul className={styles.selectList}>
					{options.map((option) => (
						<li
							key={option.value}
							className={`${styles.selectItem} ${
								selectedOptions.some((item) => item.value === option.value) ? styles.selected : ''
							}`}
							onClick={() => selectOption(option)}>
							{colors && <span className={styles.colorIcon} style={{ backgroundColor: option.color }} />}
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default MultiplySelect
