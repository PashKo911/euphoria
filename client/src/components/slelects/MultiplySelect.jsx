import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import styles from './multiplySelect.module.scss'

const MultiplySelect = ({
	options,
	placeholder = 'Select an option',
	onChange,
	multiple = false,
	colors = false,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState([])
	const selectRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const selectOption = (option) => {
		let newSelectedOptions
		if (multiple) {
			if (selectedOptions.includes(option.value)) {
				newSelectedOptions = selectedOptions.filter((item) => item !== option.value)
			} else {
				newSelectedOptions = [...selectedOptions, option.value]
			}
		} else {
			newSelectedOptions = [option.value]
			setIsOpen(false)
		}

		setSelectedOptions(newSelectedOptions)

		onChange && onChange(newSelectedOptions)
	}

	return (
		<div className={styles.select} ref={selectRef}>
			<div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
				{selectedOptions.length > 0 ? selectedOptions.join(', ') : placeholder}
				<MdOutlineKeyboardArrowDown />
			</div>

			{isOpen && (
				<ul className={styles.selectList}>
					{options.map((option) => (
						<li
							key={option.value}
							className={`${styles.selectItem} ${
								selectedOptions.includes(option.value) ? styles.selected : ''
							}`}
							onClick={() => selectOption(option)}>
							{colors && <span className={styles.colorIcon} style={{ backgroundColor: option.value }} />}
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default MultiplySelect
