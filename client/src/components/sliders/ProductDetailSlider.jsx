import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import constants from '../../utils/constants'
import { Navigation, Pagination, Controller, Thumbs } from 'swiper/modules'

import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import './productDetailSlider.scss'

const ProductDetailSlider = ({ images }) => {
	const [setMainSwiper] = useState(null)
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	if (!images || images.length === 0) {
		return <p>Loading images...</p>
	}

	return (
		<div className="wrapper">
			<div className="thumbWrapper">
				<Swiper
					modules={[Controller, Navigation, Thumbs]}
					direction="vertical"
					spaceBetween={20}
					slidesPerView={3}
					onSwiper={setThumbsSwiper}
					watchSlidesProgress
					className="thumbSlider">
					{images.map((image, index) => (
						<SwiperSlide className="thumbSlide" key={index}>
							<img
								src={`${constants.API_BASE}${image}`}
								alt={`Thumbnail ${index + 1}`}
								className="thumbImage"
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="thumbArrows">
					<div className="prevButton">
						<IoIosArrowUp size={14} />
					</div>
					<div className="nextButton">
						<IoIosArrowDown size={14} />
					</div>
				</div>
			</div>

			<Swiper
				modules={[Controller, Navigation, Thumbs]}
				thumbs={{ swiper: thumbsSwiper }}
				spaceBetween={0}
				slidesPerView={1}
				onSwiper={setMainSwiper}
				navigation={{
					nextEl: '.nextButton',
					prevEl: '.prevButton',
				}}
				className="sliderMain">
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<img src={`${constants.API_BASE}${image}`} className="image" alt={`Product slide ${index + 1}`} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default ProductDetailSlider
