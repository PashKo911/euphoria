import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

import styles from './heroMainSlider.module.scss'
import Button from '../buttons/Button'

const slides = [
	{
		id: 1,
		label: 'T-shirt / Tops',
		title: 'Summer Value Pack',
		subtitle: 'cool / colorful / comfy',
		imgSrc: '/assets/img/hero/slide-01.png',
		link: '/home/products?gender=men&page=0',
	},
	{
		id: 2,
		label: 'Jeans / Bottoms',
		title: 'Casual Denim Deals',
		subtitle: 'stylish / durable / versatile',
		imgSrc: '/assets/img/hero/slide-02.png',
		link: '/home/products?gender=women&page=0',
	},
	{
		id: 3,
		label: 'Accessories',
		title: 'Complete Your Look',
		subtitle: 'trendy / elegant / affordable',
		imgSrc: '/assets/img/hero/slide-03.png',
		link: '/home/products?gender=all&page=0',
	},
]

const HeroMainSlider = () => {
	return (
		<Swiper
			className={styles.swiper}
			modules={[Navigation, Pagination, Autoplay]}
			navigation={{
				prevEl: `.${styles.prevButton}`,
				nextEl: `.${styles.nextButton}`,
			}}
			pagination={{
				clickable: true,
				el: `.${styles.pagination}`,
			}}
			// autoplay={{ delay: 8000, disableOnInteraction: false }}
			loop={true}>
			{slides.map((slide) => (
				<SwiperSlide key={slide.id} className={styles.swiperSlide}>
					<div className={styles.container}>
						<div className={styles.body}>
							<div className={styles.label}>{slide.label}</div>
							<h2 className={styles.title}>{slide.title}</h2>
							<div className={styles.label}>{slide.subtitle}</div>
							<Button
								style={{ minWidth: 250 }}
								title={'Shop Now'}
								variant="white"
								to={'/home/products?gender=men&page=0'}
							/>
						</div>
					</div>
					<img className={styles.image} src={slide.imgSrc} alt={`${slide.title} image`} />
				</SwiperSlide>
			))}
			<div className={styles.pagination}></div>
			<button className={styles.prevButton}>
				<svg viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M6.19711 0.46967C6.49001 0.762563 6.49001 1.23744 6.19711 1.53033L1.78637 5.94107C1.75383 5.97362 1.75383 6.02638 1.78637 6.05893L6.19711 10.4697C6.49001 10.7626 6.49001 11.2374 6.19711 11.5303C5.90422 11.8232 5.42935 11.8232 5.13645 11.5303L0.72571 7.11959C0.10738 6.50126 0.10738 5.49874 0.72571 4.88041L5.13645 0.46967C5.42935 0.176777 5.90422 0.176777 6.19711 0.46967Z"
					/>
				</svg>
			</button>
			<button className={styles.nextButton}>
				<svg viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0.802922 0.46967C1.09582 0.176777 1.57069 0.176777 1.86358 0.46967L6.27433 4.88041C6.89266 5.49874 6.89266 6.50126 6.27433 7.11959L1.86358 11.5303C1.57069 11.8232 1.09582 11.8232 0.802922 11.5303C0.510029 11.2374 0.510029 10.7626 0.802922 10.4697L5.21367 6.05893C5.24621 6.02638 5.24621 5.97362 5.21367 5.94107L0.802922 1.53033C0.510029 1.23744 0.510029 0.762563 0.802922 0.46967Z"
					/>
				</svg>
			</button>
		</Swiper>
	)
}

export default HeroMainSlider
