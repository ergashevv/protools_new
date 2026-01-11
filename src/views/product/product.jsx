import { Skeleton } from 'antd'
import api from '../../api'
import parse from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
	Autoplay,
	EffectCoverflow,
	FreeMode,
	Mousewheel,
	Navigation,
	Thumbs,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Breadcrumbs from '../../components/breadcrumbs'
import Products from '../../components/products'
import { useDataContext } from '../../contexts/DataContext'
import '../../global.scss'
import './product.scss'

function Product() {
	const {
		isLike,
		addLike,
		handleShare,
		incrementCartItem,
		decrementCartItem,
		addCart,
		carts,
	} = useDataContext()
	const { slug } = useParams()
	const [catalog, setCatalog] = useState()
	const [data, setData] = useState([])
	const [active, setActive] = useState('description')
	const [loading, setLoading] = useState(true)
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [pageViews, setPageViews] = useState(0)
	const { t, i18n } = useTranslation()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(
					`/products/slug/${slug}`
				)
				const responseData = response.data.data

				setData(responseData)
				console.log(responseData)
				setLoading(false)

				localStorage.setItem('productData', JSON.stringify(responseData))

				const viewedProducts =
					JSON.parse(localStorage.getItem('viewedProducts')) || []
				const newViewedProducts = [
					...viewedProducts.filter(item => item.slug !== slug),
					responseData,
				]
				localStorage.setItem(
					'viewedProducts',
					JSON.stringify(newViewedProducts)
				)
			} catch (error) {
				console.error('Error fetching data:', error)
				setLoading(false)
			}
		}

		fetchData()
	}, [slug])

	useEffect(() => {
		const storedPageViews = localStorage.getItem(`pageViews_${slug}`)
		let newPageViews = 1

		if (storedPageViews) {
			newPageViews = parseInt(storedPageViews, 10)
		}

		if (newPageViews === 1) {
			localStorage.setItem(`pageViews_${slug}`, newPageViews.toString())
			setPageViews(newPageViews)
		}
	}, [slug])

	useEffect(() => {
		api
			.get('/categories')
			.then(res => {
				setCatalog(res?.data?.data)
				setLoading(false)
			})
			.catch(err => {
				console.log(err)
				setLoading(false)
			})
	}, [])
	return (
		<div className='product'>
			<Helmet>
				<title>
					{`${i18n.language === 'uz'
						? data?.title_uz
						: data?.title_ru || 'Loading...'
						}`}{' '}
					| Protools
				</title>
				<meta
					name='description'
					content={`${i18n.language === 'uz'
						? data?.description_uz
						: data?.description_ru
						}
`}
				/>
				<meta
					property='og:title'
					content={`${i18n.language === 'uz'
						? data?.title_uz
						: data?.title_ru
						} | Protools`}
				/>
				<meta
					property='og:description'
					content={`${i18n.language === 'uz'
						? data?.description_uz
						: data?.description_ru
						}
`}
				/>
				<meta property='og:type' content='website' />
				<meta
					property='og:url'
					content={`https://www.protools.uz/product/slug/${slug}`}
				/>
				<meta
					property='og:image'
					content={`${data?.images?.length > 0 ? data?.images[0] : ''}`}
				/>
			</Helmet>
			<Breadcrumbs href={window.location.href} title={slug} />
			<div className='container'>
				<div className='product_main'>
					{loading ? (
						<div className='main'>
							<div className='catalog' style={{ width: '300px' }}>
								<div className='catalog_body'>
									{[1, 2, 3, 4].map((item, index) => (
										<div className='catalog_item' key={index}>
											<Skeleton
												avatar
												active
												paragraph={{
													rows: 0,
												}}
											/>
										</div>
									))}
								</div>
							</div>
							<div className='main_right'>
								<Skeleton.Input active className='product_mobile_caption' />
								<div className='product_wrapper'>
									<div className='product_left' style={{ width: '100%' }}>
										<div className='mySwiper'>
											<Skeleton.Image active paragraph={{ rows: 0 }} />
											<Skeleton.Image active paragraph={{ rows: 0 }} />
											<Skeleton.Image active paragraph={{ rows: 0 }} />
											<Skeleton.Image active paragraph={{ rows: 0 }} />
										</div>
										<div className='mySwiper2'>
											<Skeleton.Image active paragraph={{ rows: 0 }} />
										</div>
									</div>
									<div className='product_right' style={{ width: '130px' }}>
										<Skeleton
											active
											paragraph={{ rows: 0 }}
											className='product_right_title'
										/>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='main'>
							<div className='catalog'>
								<h3>{t('Top_category')}</h3>
								<div className='catalog_body'>
									{catalog &&
										catalog.map(item => (
											<a
												href={`/category/${item._id}`}
												className='catalog_item'
												key={item._id}
											>
												<span className='catalog_img_wrap'>
													<img src={item.image} alt='catalog img' />
												</span>
												<span className='catalog_info'>
													{i18n.language === 'uz' ? item.title_uz : item.title_ru}
												</span>
											</a>
										))}
								</div>
							</div>
							<div className='main_right'>
								<h2 className='product_mobile_caption'>
									{i18n.language === 'uz'
										? data?.title_uz
										: data?.title_ru}
								</h2>
								<div className='product_wrapper'>
									<div className='product_left'>
										<Swiper
											onSwiper={setThumbsSwiper}
											loop={true}
											spaceBetween={10}
											slidesPerView={4}
											freeMode={true}
											watchSlidesProgress={true}
											modules={[FreeMode, Navigation, Thumbs, EffectCoverflow]}
											className='mySwiper'
										>
											{data.images &&
												data?.images.map((item, index) => (
													<SwiperSlide key={index} className='swiper_card'>
														<img src={item} alt={data.title_uz} />
													</SwiperSlide>
												))}
										</Swiper>
										<Swiper
											loop={true}
											slidesPerView={1}
											mousewheel={true}
											navigation={true}
											autoplay={{
												delay: 3000,
												disableOnInteraction: false,
											}}
											thumbs={{
												swiper:
													thumbsSwiper && !thumbsSwiper.destroyed
														? thumbsSwiper
														: null,
											}}
											modules={[
												Autoplay,
												FreeMode,
												Navigation,
												Thumbs,
												Mousewheel,
											]}
											className='mySwiper2'
										>
											{data.images &&
												data?.images.map((item, index) => (
													<SwiperSlide key={index}>
														<img src={item} alt={data.title_uz} key={index} />
													</SwiperSlide>
												))}
										</Swiper>
									</div>
									<div className='product_right'>
										<h2 className='product_right_title'>
											{i18n.language === 'uz'
												? data?.title_uz
												: data?.title_ru}
										</h2>
										<span className='product_right_info'>
											{i18n.language === 'uz'
												? data?.description_uz
												: data?.description_ru}
										</span>
										<div className='product_right_box'>
											<span className='product_right_price'>
												{data?.price !== 0
													? `${data?.price?.toLocaleString({
														style: 'currency',
														minimumFractionDigits: 0,
														currency: 'UZS',
													})} ${t('Sum')} `
													: ''}
											</span>
											<div className='product_right_box_texts'>
												<span>
													{t('In_stock')}{' '}
													<b className={data.status === 'ACTIVE' || (data.quantity && data.quantity > 0) || data.excerpt_uz ? 'stats' : 'un_stats'}>
														{data.status === 'ACTIVE' || (data.quantity && data.quantity > 0) || data.excerpt_uz ? t('Stock') : t('UnStock')}
													</b>
												</span>
												{data?.brand && (
													<span>
														{t('Model')}:
														<a
															href={`/brand/${data?.brand?._id}`}
															className='model'
														>
															{i18n.language === 'uz' ? data?.brand?.name_uz : data?.brand?.name_ru}
														</a>
													</span>
												)}
												{data?.brand && (
													<a
														href={`/brand/${data?.brand?._id}`}
														className='brend'
													>
														<img
															src={data?.brand?.image}
															alt='brand logo'
														/>
													</a>
												)}
												<hr />
												<span className='view'>
													{t('Show')}: {pageViews}
												</span>
											</div>
										</div>
										<div className='product_right_bottom_box'>
											<div className='buttons_wrap'>
												<div className='count_wrap'>
													<button 
														onClick={() => decrementCartItem(data?._id)}
														disabled={!carts.find(item => item._id === data._id) || carts.find(item => item._id === data._id)?.quantity <= 1}
														style={{ 
															opacity: (!carts.find(item => item._id === data._id) || carts.find(item => item._id === data._id)?.quantity <= 1) ? 0.5 : 1, 
															cursor: (!carts.find(item => item._id === data._id) || carts.find(item => item._id === data._id)?.quantity <= 1) ? 'not-allowed' : 'pointer' 
														}}
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='7'
															height='4'
															viewBox='0 0 7 4'
															fill='none'
														>
															<path
																d='M6.42982 0.94043V3.06043H0.569824V0.94043H6.42982Z'
																fill='#4A5056'
															/>
														</svg>
													</button>
													<span>
														{carts.find(item => item._id === data._id)
															?.quantity || 0}
													</span>
													<button 
														onClick={() => incrementCartItem(data?._id)}
														disabled={!carts.find(item => item._id === data._id) || (carts.find(item => item._id === data._id)?.quantity || 0) >= (data.quantity || 0)}
														style={{ 
															opacity: (!carts.find(item => item._id === data._id) || (carts.find(item => item._id === data._id)?.quantity || 0) >= (data.quantity || 0)) ? 0.5 : 1, 
															cursor: (!carts.find(item => item._id === data._id) || (carts.find(item => item._id === data._id)?.quantity || 0) >= (data.quantity || 0)) ? 'not-allowed' : 'pointer' 
														}}
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='11'
															height='12'
															viewBox='0 0 11 12'
															fill='none'
														>
															<path
																d='M4.47008 11.1496V6.94961H0.330078V5.04961H4.47008V0.849609H6.51008V5.04961H10.6701V6.94961H6.51008V11.1496H4.47008Z'
																fill='#4A5056'
															/>
														</svg>
													</button>
												</div>
												<button className='buy' onClick={() => addCart(data)}>
													{t('Buy')}
												</button>
												<button
													className='share'
													onClick={() => handleShare(data)}
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														x='0px'
														y='0px'
														width='30'
														height='30'
														viewBox='0 0 48 48'
													>
														<path d='M 36 5 C 32.151772 5 29 8.1517752 29 12 C 29 12.585766 29.198543 13.109464 29.335938 13.654297 L 17.345703 19.652344 C 16.059118 18.073938 14.181503 17 12 17 C 8.1517722 17 5 20.151775 5 24 C 5 27.848225 8.1517722 31 12 31 C 14.181503 31 16.059118 29.926062 17.345703 28.347656 L 29.335938 34.345703 C 29.198543 34.890536 29 35.414234 29 36 C 29 39.848225 32.151772 43 36 43 C 39.848228 43 43 39.848225 43 36 C 43 32.151775 39.848228 29 36 29 C 33.818497 29 31.940882 30.073938 30.654297 31.652344 L 18.664062 25.654297 C 18.801457 25.109464 19 24.585766 19 24 C 19 23.414234 18.801457 22.890536 18.664062 22.345703 L 30.654297 16.347656 C 31.940882 17.926062 33.818497 19 36 19 C 39.848228 19 43 15.848225 43 12 C 43 8.1517752 39.848228 5 36 5 z M 36 8 C 38.226909 8 40 9.7730927 40 12 C 40 14.226907 38.226909 16 36 16 C 33.773091 16 32 14.226907 32 12 C 32 9.7730927 33.773091 8 36 8 z M 12 20 C 14.226909 20 16 21.773093 16 24 C 16 26.226907 14.226909 28 12 28 C 9.7730915 28 8 26.226907 8 24 C 8 21.773093 9.7730915 20 12 20 z M 36 32 C 38.226909 32 40 33.773093 40 36 C 40 38.226907 38.226909 40 36 40 C 33.773091 40 32 38.226907 32 36 C 32 33.773093 33.773091 32 36 32 z'></path>
													</svg>
													{t('Share')}
												</button>
											</div>
											<div
												onClick={() => addLike(data)}
												className={isLike(data) ? 'active_like' : 'like'}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='30'
													height='30'
													viewBox='0 0 50 50'
													fill='none'
												>
													<rect width='50' height='50' rx='5' fill='white' />
													<path
														d='M38.5325 13.4754C37.7506 12.6906 36.8222 12.0681 35.8004 11.6434C34.7786 11.2186 33.6834 11 32.5774 11C31.4714 11 30.3762 11.2186 29.3544 11.6434C28.3326 12.0681 27.4042 12.6906 26.6223 13.4754L24.9996 15.1033L23.3769 13.4754C21.7975 11.891 19.6554 11.0008 17.4218 11.0008C15.1882 11.0008 13.0461 11.891 11.4667 13.4754C9.88729 15.0599 9 17.2088 9 19.4496C9 21.6903 9.88729 23.8393 11.4667 25.4237L13.0894 27.0517L24.9996 39L36.9098 27.0517L38.5325 25.4237C39.3148 24.6393 39.9353 23.708 40.3587 22.6829C40.7821 21.6579 41 20.5592 41 19.4496C41 18.34 40.7821 17.2413 40.3587 16.2162C39.9353 15.1912 39.3148 14.2598 38.5325 13.4754V13.4754Z'
														stroke='currentColor'
														strokeWidth='2'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
												<span>{t('Bookmarks')}</span>
											</div>
										</div>
									</div>
								</div>
								<div className='product_bar'>
									<div className='product_text_header'>
										<span
											className={active == 'description' ? 'active' : ''}
											onClick={() => setActive('description')}
										>
											{t('Description')}
										</span>
										<span
											className={active == 'characteristics' ? 'active' : ''}
											onClick={() => setActive('characteristics')}
										>
											{t('Character')}
										</span>
									</div>
									<div className='product_text_bottom'>
										<div
											className={
												active == 'description'
													? 'description'
													: 'description on_active'
											}
										>
											<span>
												{(i18n.language === 'uz' ? data?.description_uz : data?.description_ru)
													? parse(
														i18n.language === 'uz'
															? data?.description_uz
															: data?.description_ru
													)
													: null}
											</span>
										</div>
										<div
											className={
												active == 'characteristics'
													? 'characteristics'
													: 'characteristics  on_active'
											}
										>
											<div className='characteristics_table'>
												{(() => {
													// Parse specifications from additionalInfos
													let specifications = [];
													if (data?.additionalInfos && Array.isArray(data.additionalInfos)) {
														const specsInfo = data.additionalInfos.find((info) => info.key === 'specifications');
														if (specsInfo && specsInfo.value) {
															specifications = Array.isArray(specsInfo.value) ? specsInfo.value : [];
														}
													}

													if (specifications.length === 0) {
														return (
															<div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
																{i18n.language === 'uz' ? 'Xususiyatlar mavjud emas' : 'Характеристики отсутствуют'}
															</div>
														);
													}

													return (
														<table style={{ width: '100%', borderCollapse: 'collapse' }}>
															<tbody>
																{specifications.map((spec, index) => (
																	<tr key={index} style={{ borderBottom: '1px solid #eee' }}>
																		<td style={{ padding: '12px', fontWeight: 'bold', width: '40%', color: '#333' }}>
																			{i18n.language === 'uz' ? (spec.key_uz || spec.key) : (spec.key_ru || spec.key)}
																		</td>
																		<td style={{ padding: '12px', color: '#666' }}>
																			{i18n.language === 'uz' ? (spec.value_uz || spec.value) : (spec.value_ru || spec.value)}
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													);
												})()}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Products title={t('Recommend')} />
		</div>
	)
}

export default Product
