import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'

import { LuArrowRight } from 'react-icons/lu'
import { FiShoppingCart } from 'react-icons/fi'

import Rating from '../../components/rating/Rating'

import './productDetail.scss'
import SizeInput from '../../components/inputs/SizeInput'
import ColorsInputRound from '../../components/inputs/ColorsInputRound'
import ButtonPurple from '../../components/buttons/ButtonPurple'
import ProductDetailSlider from '../../components/sliders/ProductDetailSlider'
import TitleDecor from '../../components/TitleDecor'
import ProcessMessage from '../../components/process/ProcessMessage'

const ProductDetail = () => {
	const [productData, setProductData] = useState({})
	const { get, process } = useHttp()
	const { id } = useParams()

	const fetchProduct = async () => {
		try {
			const product = await get(`/products/edit/${id}`)
			setProductData(product)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchProduct()
	}, [])

	return (
		<div className="layout-wrapper">
			<ProcessMessage process={process} />
			<div className="page__product product">
				<section className="product__main main-product">
					<div className="main-product__container">
						<form action="#" className="main-product__body">
							<h1 className="main-product__title">{productData.title}</h1>
							<Rating initialRating={productData.rating} />
							<div className="main-product__sizes sizes-product">
								<div className="sizes-product__header">
									<h5 className="sizes-product__title">Select Size</h5>
									<Link className="sizes-product__guide">
										<LuArrowRight />
										Size Guide
									</Link>
								</div>
								<div className="sizes-product__items">
									{productData.sizes?.map((size, index) => (
										<SizeInput key={index} title={size.name} type="radio" />
									))}
								</div>
							</div>
							<div className="main-product__colors colors-product">
								<h5 className="colors-product__title">Colours Available</h5>
								<div className="colors-product__items">
									{productData.colors?.map((color, index) => (
										<ColorsInputRound key={index} props={color} />
									))}
								</div>
							</div>
							<div className="main-product__footer">
								<ButtonPurple
									style={{ width: 'max-content', minWidth: 167 }}
									title={'Add to cart'}
									icon={<FiShoppingCart />}
									// isLoading={process}
								/>
								<div className="main-product__price">${productData.price}</div>
							</div>
							<div className="main-product__info info-product">
								<div className="info-product__item _icon-credit-cart">Secure payment</div>
								<div className="info-product__item _icon-size-fit">Size & Fit</div>
								<div className="info-product__item _icon-truck">Free shipping</div>
								<div className="info-product__item _icon-free-shiping">Free Shipping & Returns</div>
							</div>
						</form>
						<ProductDetailSlider images={productData.paths} />
					</div>
				</section>
				<section className="product__description description">
					<div className="description__container">
						<TitleDecor title="Product Description" />
						<div className="description__body">
							<div className="description__text">
								<p>{productData.description}</p>
							</div>
							<div className="description__table">
								<div className="description__item">
									<div className="description__label">Fabric</div>
									<div className="description__value">Bio-washed Cotton</div>
								</div>
								<div className="description__item">
									<div className="description__label">Pattern</div>
									<div className="description__value">Printed</div>
								</div>
								<div className="description__item">
									<div className="description__label">Fit</div>
									<div className="description__value">Regular-fit</div>
								</div>
								<div className="description__item">
									<div className="description__label">Neck</div>
									<div className="description__value">Round Neck</div>
								</div>
								<div className="description__item">
									<div className="description__label">Sleeve</div>
									<div className="description__value">Half-sleevess</div>
								</div>
								<div className="description__item">
									<div className="description__label">Style</div>
									<div className="description__value">Casual Wear</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default ProductDetail