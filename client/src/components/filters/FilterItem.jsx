import styles from './filterItem.module.scss'

const FilterItem = ({ items, colCount }) => {
	return (
		<div className={styles.items} style={{ gridTemplateColumns: `repeat(${colCount},1fr)` }}>
			{items.map((item) => item)}
		</div>
	)
}

export default FilterItem
