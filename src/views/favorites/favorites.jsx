import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs'
import ProductCard from '../../components/productCard'
import { useDataContext } from '../../contexts/DataContext'
import './favorites.scss'

function Favorites() {
	const { likes, addLike, isLike, handleShare, addCart } = useDataContext()
	const [favoriteData, setFavoriteData] = useState([])
	const { t, i18n } = useTranslation()

	useEffect(() => {
		setFavoriteData(likes)
	}, [likes])

	return (
		<div className='favorites'>
			<Breadcrumbs href={window.location.href} title={`${t('Favorites')}`} />
			<div className='container'>
				{favoriteData.length === 0 ? (
					<div className='no_data'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='104'
							height='91'
							viewBox='0 0 104 91'
							fill='none'
						>
							<path
								d='M52 23.75C52 23.75 58.1019 2 77.4237 2C92.4746 2 102 14.4697 102 29.2423C102 49.6732 82.1559 63.2017 52 89C21.8443 63.2017 2 49.6732 2 29.2423C2 14.4697 11.5254 2 26.5763 2C45.8983 2 52 23.75 52 23.75Z'
								stroke='#101828'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M46.7273 50.899L46.7281 50.898C48.1776 49.2882 50.1434 48.3838 52.1932 48.3838C54.2429 48.3838 56.2088 49.2882 57.6582 50.898L57.6591 50.899M40 40C41.0035 41.0732 42.365 41.6768 43.7841 41.6768C45.2032 41.6768 46.5641 41.0738 47.5677 40.0006M56.8182 40C57.8217 41.0732 59.1832 41.6768 60.6023 41.6768C62.0214 41.6768 63.3823 41.0738 64.3859 40.0006'
								stroke='#101828'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<h2>{t('Like')}</h2>
						<p>{t('Like_info')}</p>
						<Link to='/'>{t('Main')}</Link>
					</div>
				) : (
					<div className='favorite_products'>
						{favoriteData.map((item, index) => (
							<ProductCard
								image={item.images[0]}
								title={
									i18n.language === 'uz'
										? item.title
										: item.additionalInfos.find(info => info.key === 'titleRu')
												?.value
								}
								price={item.price}
								path={`/product/${item.slug}`}
								pressLike={() => addLike(item)}
								onClick={() => addCart(item)}
								like={isLike(item)}
								handlerShare={() => handleShare(item)}
								key={index}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Favorites
