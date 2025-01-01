import styles from './pagination.module.scss'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageClick = (page) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page)
		}
	}

	const renderPageNumbers = () => {
		const pages = []
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<button
					key={i}
					className={`${styles.button} ${i === currentPage ? styles.active : ''}`}
					onClick={() => handlePageClick(i)}>
					{i}
				</button>
			)
		}
		return pages
	}

	return (
		<div className={styles.pagination}>
			<button
				className={styles.button}
				onClick={() => handlePageClick(currentPage - 1)}
				disabled={currentPage === 1}>
				&lt; Prev
			</button>
			{renderPageNumbers()}
			<button
				className={styles.button}
				onClick={() => handlePageClick(currentPage + 1)}
				disabled={currentPage === totalPages}>
				Next &gt;
			</button>
		</div>
	)
}

export default Pagination
