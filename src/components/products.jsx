import React, { useEffect, useState } from 'react'

import api from '../api'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDataContext } from '../contexts/DataContext'
import '../global.scss'
import Loadingcard from './loadingcard'
import ProductCard from './productCard'

function Products({ title, slug: propSlug }) {
	const { slug: paramSlug } = useParams()
	const slug = propSlug || paramSlug
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const { addLike, addCart, isLike, handleShare } = useDataContext()
	const { i18n } = useTranslation()

	useEffect(() => {
		// Skip fetching if no slug is available
		if (!slug) {
			setLoading(false)
			return
		}

		api
			.get(`/products/slug/${slug}`)
			.then(res => {
				setData(res?.data?.data)
				setLoading(false)
			})
			.catch(err => {
				console.log(err)
				setLoading(false)
			})
	}, [slug])

	return (
		<div className='products'>
			<div className='container'>
				<h2 className='home_headline'>{title}</h2>
				{loading ? (
					<Swiper
						spaceBetween={20}
						slidesPerView={7.3}
						navigation={true}
						breakpoints={{
							100: {
								slidesPerView: 2.3,
							},
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 7.3,
							},
						}}
						modules={[Navigation]}
						className='mySwiper'
					>
						<SwiperSlide>
							<Loadingcard />
						</SwiperSlide>
						<SwiperSlide>
							<Loadingcard />
						</SwiperSlide>
						<SwiperSlide>
							<Loadingcard />
						</SwiperSlide>
						<SwiperSlide>
							<Loadingcard />
						</SwiperSlide>
						<SwiperSlide>
							<Loadingcard />
						</SwiperSlide>
						<SwiperSlide>
							<Loadingcard />
						</SwiperSlide>
						<SwiperSlide>
							<Loadingcard />
						</SwiperSlide>
						<SwiperSlide>
							<Loadingcard />
						</SwiperSlide>
					</Swiper>
				) : (
					<Swiper
						spaceBetween={20}
						slidesPerView={7.3}
						navigation={true}
						breakpoints={{
							100: {
								slidesPerView: 2.3,
							},
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 7.3,
							},
						}}
						modules={[Navigation]}
						className='mySwiper'
					>
						{data.recommendProducts?.map((item, index) => (
							<SwiperSlide key={index}>
								<ProductCard
									onClick={() => addCart(item)}
									pressLike={() => addLike(item)}
									image={item.images[0]}
									title={
										i18n.language === 'uz'
											? item?.title_uz
											: item?.title_ru
									}
									price={item.price}
									path={`/product/${item.slug}`}
									like={isLike(item)}
									handlerShare={() => handleShare(item)}
									excerpt={item.excerpt_uz}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>
		</div>
	)
}

export default Products
