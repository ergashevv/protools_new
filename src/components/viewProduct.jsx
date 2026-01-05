import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import { useDataContext } from '../contexts/DataContext'
import '../global.scss'

function ViewProduct() {
	const [viewedProducts, setViewedProducts] = useState([])
	const { isLike, addLike, handleShare, addCart } = useDataContext()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		const storedProducts =
			JSON.parse(localStorage.getItem('viewedProducts')) || []
		setViewedProducts(storedProducts)
	}, [])

	const settings = {
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1.2,
					slidesToScroll: 1,
					initialSlide: 0,
				},
			},
		],
	}

	return (
		<div className='view_section'>
			<div className='container'>
				{viewedProducts.length > 0 && <h2>{t('ViewSection')}</h2>}
				{viewedProducts.length ? (
					<Slider {...settings}>
						{viewedProducts?.map((item, index) => (
							<div className='view_card' key={index}>
								<a href={`/product/${item.slug}`} className='image'>
									{item.images && item.images[0] && (
										<img src={item.images[0]} alt='product img' />
									)}
								</a>
								<div className='right'>
									<a href={`/product/${item.slug}`} className='title'>
										{i18n.language === 'uz'
											? item.title
											: item.additionalInfos.find(
													info => info.key === 'titleRu'
											  )?.value}
									</a>
									<span>
										{item.price !== 0
											? `${item.price?.toLocaleString({
													style: 'currency',
													minimumFractionDigits: 0,
													currency: 'UZS',
											  })} ${t('Sum')}`
											: ''}
									</span>
									<div className='btn_wrap'>
										<Tooltip title={t('Buy')}>
											<button className='add' onClick={() => addCart(item)}>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='20'
													viewBox='0 0 24 20'
													fill='none'
												>
													<path
														d='M0.5 1.75928H3.1407C3.98715 1.75928 4.74194 2.29213 5.0253 3.08975L5.60526 4.72224M5.60526 4.72224L8.56647 13.0575C8.91539 14.0396 9.96005 14.5892 10.967 14.3203L21.016 11.637C21.8912 11.4033 22.5 10.6106 22.5 9.70472V6.72224C22.5 5.61767 21.6046 4.72224 20.5 4.72224H5.60526Z'
														stroke='currentColor'
														strokeWidth='1.3'
													/>
													<path
														d='M5.41843 17.2407C5.41843 18.1244 6.13477 18.8407 7.01843 18.8407C7.90208 18.8407 8.61843 18.1244 8.61843 17.2407C8.61843 16.3571 7.90208 15.6407 7.01843 15.6407C6.13477 15.6407 5.41843 16.3571 5.41843 17.2407ZM6.20361 17.5407H7.01843V16.9407H6.20361V17.5407Z'
														fill='currentColor'
													/>
													<path
														d='M16.0112 17.2407C16.0112 18.1244 16.7275 18.8407 17.6112 18.8407C18.4949 18.8407 19.2112 18.1244 19.2112 17.2407C19.2112 16.3571 18.4949 15.6407 17.6112 15.6407C16.7275 15.6407 16.0112 16.3571 16.0112 17.2407ZM16.7964 17.5407H17.6112V16.9407H16.7964V17.5407Z'
														fill='currentColor'
													/>
												</svg>
											</button>
										</Tooltip>
										<Tooltip title={t('Bookmarks')}>
											<button className='like' onClick={() => addLike(item)}>
												{isLike(item) ? (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='30'
														height='30'
														viewBox='0 0 50 50'
														fill='none'
													>
														<rect width='20' height='20' rx='5' fill='white' />
														<path
															d='M38.5325 13.4754C37.7506 12.6906 36.8222 12.0681 35.8004 11.6434C34.7786 11.2186 33.6834 11 32.5774 11C31.4714 11 30.3762 11.2186 29.3544 11.6434C28.3326 12.0681 27.4042 12.6906 26.6223 13.4754L24.9996 15.1033L23.3769 13.4754C21.7975 11.891 19.6554 11.0008 17.4218 11.0008C15.1882 11.0008 13.0461 11.891 11.4667 13.4754C9.88729 15.0599 9 17.2088 9 19.4496C9 21.6903 9.88729 23.8393 11.4667 25.4237L13.0894 27.0517L24.9996 39L36.9098 27.0517L38.5325 25.4237C39.3148 24.6393 39.9353 23.708 40.3587 22.6829C40.7821 21.6579 41 20.5592 41 19.4496C41 18.34 40.7821 17.2413 40.3587 16.2162C39.9353 15.1912 39.3148 14.2598 38.5325 13.4754V13.4754Z'
															stroke='#6b0000'
															fill='#6b0000'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
												) : (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='30'
														height='30'
														viewBox='0 0 50 50'
														fill='none'
													>
														<rect width='20' height='20' rx='5' fill='white' />
														<path
															d='M38.5325 13.4754C37.7506 12.6906 36.8222 12.0681 35.8004 11.6434C34.7786 11.2186 33.6834 11 32.5774 11C31.4714 11 30.3762 11.2186 29.3544 11.6434C28.3326 12.0681 27.4042 12.6906 26.6223 13.4754L24.9996 15.1033L23.3769 13.4754C21.7975 11.891 19.6554 11.0008 17.4218 11.0008C15.1882 11.0008 13.0461 11.891 11.4667 13.4754C9.88729 15.0599 9 17.2088 9 19.4496C9 21.6903 9.88729 23.8393 11.4667 25.4237L13.0894 27.0517L24.9996 39L36.9098 27.0517L38.5325 25.4237C39.3148 24.6393 39.9353 23.708 40.3587 22.6829C40.7821 21.6579 41 20.5592 41 19.4496C41 18.34 40.7821 17.2413 40.3587 16.2162C39.9353 15.1912 39.3148 14.2598 38.5325 13.4754V13.4754Z'
															stroke='currentColor'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
												)}
											</button>
										</Tooltip>
										<Tooltip title={t('Share')}>
											<button
												className='share'
												onClick={() => handleShare(item)}
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
											</button>
										</Tooltip>
									</div>
								</div>
							</div>
						))}
					</Slider>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default ViewProduct
