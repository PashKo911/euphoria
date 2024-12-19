import { v4 as uuid } from 'uuid'

import ColorsInput from '../../components/inputs/ColorsInput'
import SizeInput from '../../components/inputs/SizeInput'
import CategoryInput from '../../components/inputs/CategoryInput'
import SliderInput from '../../components/inputs/SliderInput'
import Accordion from '../accordion/Accordion'

import { GiSettingsKnobs } from 'react-icons/gi'
import { RiCloseLargeFill } from 'react-icons/ri'

import styles from './filter.module.scss'
import { useState } from 'react'

const data = {
	price: {
		title: 'Price',
		items: [<SliderInput key={uuid()} min={20} max={1000} />],
	},
	colors: {
		title: 'Colors',
		items: [
			<ColorsInput title={'Purple'} color={'#8434e1'} key={'#8434e1'} />,
			<ColorsInput title={'Black'} color={'#000000'} key={'#000000'} />,
			<ColorsInput title={'Red'} color={'#F35528'} key={'#F35528'} />,
			<ColorsInput title={'Orange'} color={'#F16F2B'} key={'#F16F2B'} />,
			<ColorsInput title={'Navy'} color={'#345EFF'} key={'#345EFF'} />,
		],
	},
	size: {
		title: 'Size',
		items: [
			<SizeInput title={'XXS'} key={'XXS'} />,
			<SizeInput title={'XS'} key={'XS'} />,
			<SizeInput title={'S'} key={'S'} />,
			<SizeInput title={'M'} key={'M'} />,
			<SizeInput title={'L'} key={'L'} />,
		],
	},
	style: {
		title: 'Dress Style',
		items: [
			<CategoryInput title={'Classic'} key={'Classic'} />,
			<CategoryInput title={'Casual'} key={'Casual'} />,
			<CategoryInput title={'Business'} key={'Business'} />,
		],
	},
}

const Filter = ({ isFilterOpen, callback }) => {
	return (
		<aside className={`${styles.filter} ${isFilterOpen ? styles.open : ''}`}>
			<div className={styles.header}>
				<h4 className={styles.filterTitle}>Filter</h4>

				{isFilterOpen ? (
					<button type="button" className={styles.filterButton} onClick={() => callback(!isFilterOpen)}>
						<RiCloseLargeFill size={20} />
					</button>
				) : (
					<GiSettingsKnobs />
				)}
			</div>
			<form action="#" className={styles.filterBody}>
				<Accordion title={data.style.title} items={data.style.items} colCount={1} />
				<Accordion title={data.price.title} items={data.price.items} colCount={1} />
				<Accordion title={data.colors.title} items={data.colors.items} colCount={4} />
				<Accordion title={data.size.title} items={data.size.items} colCount={3} />
			</form>
		</aside>
	)
}

export default Filter
