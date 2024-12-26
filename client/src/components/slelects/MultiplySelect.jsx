import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import styles from './multiplySelect.module.scss'

const MultiplySelect = ({
	options,
	placeholder = 'Select an option',
	onChange,
	multiple = false,
	colors = false,
	isLoading = false,
	resetValues = false,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState([])
	const selectRef = useRef(null)

	useEffect(() => {
		if (resetValues) {
			setSelectedOptions([])
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
		let newSelectedOptions
		if (multiple) {
			if (selectedOptions.some((item) => item.value === option.value)) {
				newSelectedOptions = selectedOptions.filter((item) => item.value !== option.value)
			} else {
				newSelectedOptions = [...selectedOptions, option]
			}
		} else {
			newSelectedOptions = [option]
			setIsOpen(false)
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
							{colors && <span className={styles.colorIcon} style={{ backgroundColor: option.label }} />}
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default MultiplySelect
