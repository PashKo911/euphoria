import styles from './filterItem.module.scss'
import getFilterType from '../../utils/getFilterType'

const FilterItem = ({ items, colCount, filterType }) => {
	const isPriceFilter = filterType === 'price'

	return (
		<div className={styles.items} style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}>
			{isPriceFilter
				? getFilterType(filterType, { minPrice: items.minPrice, maxPrice: items.maxPrice })
				: items.map((item) => getFilterType(filterType, item))}
		</div>
	)
}

export default FilterItem
