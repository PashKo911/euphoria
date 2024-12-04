import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import FilterItem from '../pages/products/FilterItem'

import styles from './accordion.module.scss'

const Accordion = ({ title, items, colCount }) => {
	const [open, setOpen] = useState(true)

	return (
		<div className={`${open ? styles.open : ''}`}>
			<h5>
				<button type="button" className={styles.button} onClick={() => setOpen(!open)}>
					{title}
					<IoIosArrowUp size={'1em'} />
				</button>
			</h5>
			<div className={styles.body}>
				<FilterItem items={items} colCount={colCount} />
			</div>
		</div>
	)
}

export default Accordion
