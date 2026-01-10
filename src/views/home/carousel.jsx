import { Skeleton } from 'antd'
import api from '../../api'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'
import '../../global.scss'
import './home.scss'

const Carousel = () => {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])
	const { i18n } = useTranslation()

	useEffect(() => {
		// Fetch all banners (banner, news, discount) - barcha bannerlar birga ko'rsatiladi
		api
			.get(`/banners`)
			.then(response => {
				console.log('Banners API response:', response.data)
				// Handle different response formats
				const bannersData = response.data?.data || response.data || []
				setData(Array.isArray(bannersData) ? bannersData : [])
				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching banners:', error)
				setLoading(false)
			})
	}, [])

	const settingsTop = {
		autoplay: true,
		autoplaySpeed: 3000,
		infinite: false,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 700,
		responsive: [
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	return (
		<div className='slider container'>
			{loading ? (
				<>
					<Skeleton.Image active className='skeleton_banner' />
				</>
			) : (
				<div className='slider-container'>
					{data.length > 0 ? (
						<Slider {...settingsTop}>
							{data
								.filter(item => {
									// Filter out items without imageUrl
									const imageUrl = item.imageUrl || item.image_url
									return imageUrl && imageUrl.trim() !== ''
								})
								.map((item, index) => {
									// Support both camelCase and snake_case formats for backward compatibility
									const imageUrl = item.imageUrl || item.image_url
									const titleUz = item.title_uz || item.titleUz
									const titleRu = item.title_ru || item.titleRu
									const descriptionUz = item.description_uz || item.descriptionUz
									const descriptionRu = item.description_ru || item.descriptionRu
									const link = item.link || '#'
									const bannerType = item.type || 'banner' // banner, news, discount
									
									// Get discount data if type is discount
									let discountData = null
									if (bannerType === 'discount') {
										try {
											const bodyData = i18n.language === 'uz' 
												? (item.body_uz || item.bodyUz)
												: (item.body_ru || item.bodyRu)
											if (bodyData) {
												discountData = typeof bodyData === 'string' ? JSON.parse(bodyData) : bodyData
											}
										} catch (e) {
											console.error('Error parsing discount data:', e)
										}
									}
									
									// Get current language content
									const isUz = i18n.language === 'uz'
									const title = isUz ? titleUz : titleRu
									const description = isUz ? descriptionUz : descriptionRu
									
									return (
										<div className='slider_top' key={item.id || item._id || index}>
											<Link to={link} className='slider_top_link'>
												<div className='slider_top_image_wrapper'>
													<img
														src={imageUrl}
														alt={title || 'Banner'}
														width={100}
														height={480}
														onError={(e) => {
															console.error('Image load error:', imageUrl, 'Banner type:', bannerType)
															e.target.style.display = 'none'
														}}
													/>
													{/* Overlay Content */}
													<div className='slider_top_overlay'>
														{bannerType === 'discount' && discountData ? (
															<div className='slider_overlay_discount'>
																{discountData.percent && (
																	<div className='discount_badge'>
																		{discountData.percent}% {isUz ? 'chegirma' : 'скидка'}
																	</div>
																)}
																{title && <h2 className='overlay_title'>{title}</h2>}
																{discountData.text && (
																	<p className='discount_text'>{discountData.text}</p>
																)}
																{(discountData.oldPrice || discountData.newPrice) && (
																	<div className='discount_prices'>
																		{discountData.oldPrice && (
																			<span className='old_price'>{discountData.oldPrice}</span>
																		)}
																		{discountData.newPrice && (
																			<span className='new_price'>{discountData.newPrice}</span>
																		)}
																	</div>
																)}
																{discountData.validUntil && (
																	<p className='discount_valid'>{discountData.validUntil}</p>
																)}
															</div>
														) : (
															<div className='slider_overlay_content'>
																{title && <h2 className='overlay_title'>{title}</h2>}
																{description && <p className='overlay_description'>{description}</p>}
																{bannerType === 'news' && (
																	<span className='news_badge'>{isUz ? 'Yangilik' : 'Новость'}</span>
																)}
															</div>
														)}
													</div>
												</div>
											</Link>
										</div>
									)
								})}
						</Slider>
					) : (
						<div className='empty_banner'>
							Hozirda bannerlar mavjud emas
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Carousel
