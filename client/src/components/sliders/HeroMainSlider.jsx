import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './heroMainSlider.module.scss'
import { Link } from 'react-router-dom'

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
			navigation
			pagination={{ clickable: true, el: `.${styles.pagination}` }}
			// autoplay={{ delay: 3000, disableOnInteraction: false }}
			loop={true}
			spaceBetween={20}>
			{slides.map((slide) => (
				<SwiperSlide key={slide.id} className={styles.swiperSlide}>
					<div className={styles.container}>
						<div className={styles.body}>
							<div className={styles.label}>{slide.label}</div>
							<h2 className={styles.title}>{slide.title}</h2>
							<div className={styles.label}>{slide.subtitle}</div>
							<Link className={styles.button} to={slide.link}>
								Shop Now
							</Link>
							<img src={slide.imgSrc} alt={`${slide.title} image`} />
						</div>
					</div>
				</SwiperSlide>
			))}
			<div className={styles.pagination}></div>
		</Swiper>
	)
}

export default HeroMainSlider

// <section className="page__hero hero swiper">
// 	<div className="hero__wrapper swiper-wrapper">
// 		<div className="hero__slide slide-hero swiper-slide">
// 			<div className="slide-hero__container">
// 				<div className="slide-hero__body">
// 					<div data-swiper-parallax="-80%" className="slide-hero__label">
// 						T-shirt / Tops
// 					</div>
// 					<h2 data-swiper-parallax="-100%" className="slide-hero__title">
// 						Some other <br /> products
// 					</h2>
// 					<div data-swiper-parallax="-60%" className="slide-hero__label">
// 						cool / colorful / comfy
// 					</div>
// 					<a data-swiper-parallax="-100%" href="#" className="slide-hero__button button button--white">
// 						Shop Now
// 					</a>
// 				</div>
// 			</div>
// 			<img
// 				src="/assets/img/hero/slide-01.png"
// 				className="slide-hero__image slide-hero__image--top-right"
// 				alt="Image"
// 			/>
// 		</div>
// 		<div className="hero__slide slide-hero swiper-slide">
// 			<div className="slide-hero__container">
// 				<div className="slide-hero__body">
// 					<div data-swiper-parallax="-80%" className="slide-hero__label">
// 						T-shirt / Tops
// 					</div>
// 					<h2 data-swiper-parallax="-100%" className="slide-hero__title">
// 						Some other <br /> products
// 					</h2>
// 					<div data-swiper-parallax="-60%" className="slide-hero__label">
// 						cool / colorful / comfy
// 					</div>
// 					<a data-swiper-parallax="-100%" href="#" className="slide-hero__button button button--white">
// 						Shop Now
// 					</a>
// 				</div>
// 			</div>
// 			<img
// 				src="/assets/img/hero/slide-01.png"
// 				className="slide-hero__image slide-hero__image--top-right"
// 				alt="Image"
// 			/>
// 		</div>
// 		<div className="hero__slide slide-hero swiper-slide">
// 			<div className="slide-hero__container">
// 				<div className="slide-hero__body">
// 					<div data-swiper-parallax="-80%" className="slide-hero__label">
// 						T-shirt / Tops
// 					</div>
// 					<h2 data-swiper-parallax="-100%" className="slide-hero__title">
// 						Some other <br /> products
// 					</h2>
// 					<div data-swiper-parallax="-60%" className="slide-hero__label">
// 						cool / colorful / comfy
// 					</div>
// 					<a data-swiper-parallax="-100%" href="#" className="slide-hero__button button button--white">
// 						Shop Now
// 					</a>
// 				</div>
// 			</div>
// 			<img
// 				src="/assets/img/hero/slide-01.png"
// 				className="slide-hero__image slide-hero__image--top-right"
// 				alt="Image"
// 			/>
// 		</div>
// 		<div className="hero__slide slide-hero swiper-slide">
// 			<div className="slide-hero__container">
// 				<div className="slide-hero__body">
// 					<div data-swiper-parallax="-80%" className="slide-hero__label">
// 						T-shirt / Tops
// 					</div>
// 					<h2 data-swiper-parallax="-100%" className="slide-hero__title">
// 						Some other <br /> products
// 					</h2>
// 					<div data-swiper-parallax="-60%" className="slide-hero__label">
// 						cool / colorful / comfy
// 					</div>
// 					<a data-swiper-parallax="-100%" href="#" className="slide-hero__button button button--white">
// 						Shop Now
// 					</a>
// 				</div>
// 			</div>
// 			<img
// 				src="/assets/img/hero/slide-01.png"
// 				className="slide-hero__image slide-hero__image--top-right"
// 				alt="Image"
// 			/>
// 		</div>
// 	</div>
// 	<div className="hero__pagination"></div>
// 	<button className="hero__arrow hero__arrow--prev _icon-ch-left"></button>
// 	<button className="hero__arrow hero__arrow--next _icon-ch-right"></button>
// </section>
