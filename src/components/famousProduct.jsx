import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../components/productCard'
import { useDataContext } from '../contexts/DataContext'
import '../global.scss'
import Loadingcard from './loadingcard'

function FamousProduct() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const { addLike, addCart, isLike, handleShare } = useDataContext()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		axios
			.get(`https://api.protools.uz/v1/products?featured=true`)
			.then(res => {
				setData(res.data.data)
				setLoading(false)
			})
			.catch(err => {
				setLoading(false)
			})
	}, [])

	return (
		<div className='products'>
			<div className='container'>
				<h2 className='home_headline'>{t('Top_product')}</h2>
				{loading ? (
					<Swiper
						spaceBetween={20}
						slidesPerView={8}
						navigation={true}
						breakpoints={{
							100: {
								slidesPerView: 2,
							},
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 8,
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
						slidesPerView={8}
						navigation={true}
						breakpoints={{
							100: {
								slidesPerView: 2,
							},
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 8,
							},
						}}
						modules={[Navigation]}
						className='mySwiper'
					>
						{data?.map((item, index) => (
							<SwiperSlide key={index}>
								<ProductCard
									pressLike={() => addLike(item)}
									onClick={() => addCart(item)}
									image={item.images[0]}
									title={
										i18n.language === 'uz'
											? item?.title
											: item?.additionalInfos.find(
													info => info.key === 'titleRu'
											  )?.value
									}
									price={item.price}
									path={`/product/${item.slug}`}
									like={isLike(item)}
									handlerShare={() => handleShare(item)}
									excerpt={item.excerpt}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>
		</div>
	)
}

export default FamousProduct
