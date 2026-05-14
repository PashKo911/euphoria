import { useFilter } from '../../context/FilterProvider'
import PaginationButton from './PaginationButton'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import styles from './pagination.module.scss'

const Pagination = ({ productsCount }) => {
	const { state, dispatch } = useFilter()
	const currentPage = state.page
	const perPage = state.perPage
	const totalPages = Math.ceil(productsCount / perPage)

	const handlePageClick = (page) => {
		if (page >= 0 && page < totalPages) {
			dispatch({ type: 'SET_PAGE', payload: page })
		}
	}

	return (
		<div style={{ display: totalPages < 2 ? 'none' : 'flex' }} className={styles.pagination}>
			<PaginationButton disabled={currentPage === 0} onClick={() => handlePageClick(currentPage - 1)}>
				<IoIosArrowBack size={20} /> Prev
			</PaginationButton>
			<div className={styles.pagesInfo}>{`Page ${currentPage + 1} of ${totalPages}`}</div>
			<div className={styles.buttonsWrapper}>
				{Array.from({ length: totalPages }, (_, i) => (
					<PaginationButton
						key={i}
						isActive={i === currentPage}
						onClick={() => handlePageClick(i)}
						aria-label={`Page ${i + 1}`}
						aria-current={i === currentPage ? 'page' : undefined}>
						{i + 1}
					</PaginationButton>
				))}
			</div>
			<PaginationButton
				disabled={currentPage === totalPages - 1}
				onClick={() => handlePageClick(currentPage + 1)}>
				Next <IoIosArrowForward size={20} />
			</PaginationButton>
		</div>
	)
}

export default Pagination
