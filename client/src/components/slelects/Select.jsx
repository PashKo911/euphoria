import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import styles from './select.module.scss'

const Select = ({ options, placeholder = 'Select an option', onChange }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState(null)
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
		setSelectedOption(option)
		setIsOpen(false)
		onChange && onChange(option)
	}

	return (
		<div className={styles.select} ref={selectRef}>
			<div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
				{selectedOption ? selectedOption.label : placeholder}
				<MdOutlineKeyboardArrowDown />
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
