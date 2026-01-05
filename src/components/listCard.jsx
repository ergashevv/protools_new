import { Tooltip } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDataContext } from '../contexts/DataContext'
import '../global.scss'

function ListCard({ data }) {
	const { images, price, slug, excerpt } = data
	console.log(data)
	const {
		handleShare,
		addLike,
		isLike,
		addCart,
		incrementCartItem,
		decrementCartItem,
		carts,
	} = useDataContext()
	const { t, i18n } = useTranslation()

	const cartItem = carts.find(item => item._id === data._id)
	const quantity = cartItem ? cartItem.quantity : 0

	return (
		<div className='listCard'>
			<div className='image_wrap'>
				<img src={images[0]} alt='img' />
			</div>
			<div className='right'>
				<div className='right_top'>
					<span className={excerpt ? "yeah" : "no_yeah"}>{excerpt ? t('Stock') : t('UnStock')}</span>
					<a
						href={`/brand/${
							data?.additionalInfos?.find(info => info.key === 'brand')?.value
						}`}
						className='brand'
					>
						{data?.additionalInfos?.find(info => info.key === 'brand')?.value}
					</a>
				</div>
				<a href={`/product/${slug}`} className='title'>
					{i18n.language === 'uz'
						? data?.title
						: data?.additionalInfos.find(info => info.key === 'titleRu')?.value}
				</a>
				<span className='description'>
					{' '}
					{i18n.language === 'uz'
						? data?.description
						: data?.additionalInfos.find(info => info.key === 'descriptionRu')
								?.value}
				</span>
				<span className='price'>
					{price !== 0
						? `${price?.toLocaleString({
								style: 'currency',
								minimumFractionDigits: 0,
								currency: 'UZS',
						  })} ${t('Sum')} `
						: ''}
				</span>
				<div className='wrapper'>
					<div className='count_wrap'>
						<button onClick={() => decrementCartItem(data._id)}>
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
						<span>{quantity}</span>
						<button onClick={() => incrementCartItem(data._id)}>
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
					<Tooltip placement='top' title={t('Bookmarks')}>
						<button className={isLike(data) ? "dislike" : "like"} onClick={() => addLike(data)}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='30'
								height='30'
								viewBox='0 0 50 50'
								fill={'none'}
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
						</button>
					</Tooltip>
					<Tooltip placement='top' title={t('Share')}>
						<button className='share' onClick={() => handleShare(data)}>
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
	)
}

export default ListCard
