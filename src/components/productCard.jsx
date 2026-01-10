import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import '../global.scss'

function ProductCard({
	image,
	title,
	price,
	path,
	onClick,
	pressLike,
	like,
	excerpt,
	quantity,
}) {
	const { t } = useTranslation()
	// Check stock: use quantity if available, otherwise fall back to excerpt (for backward compatibility)
	const inStock = (quantity !== undefined && quantity > 0) || excerpt
	return (
		<div className='product_card'>
			<Link to={path}>
				<div className='product_card_image_wrap'>
					<img src={image} alt={title} loading='lazy' />
				</div>
				<div className={inStock ? 'stats' : 'un_stats'}>
					{inStock ? t('Stock') : t('UnStock')}
				</div>
				<h4>{title}</h4>
			</Link>
			<div className='product_card_bottom_wrap'>
				<span className='sum'>
					{price !== 0
						? `${price?.toLocaleString({
								style: 'currency',
								minimumFractionDigits: 0,
								currency: 'UZS',
						  })} ${t('Sum')}`
						: ''}
				</span>
				<button onClick={onClick}>
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
					{t('Buy')}
				</button>
				<div
					className={like ? 'active' : 'product_card_bottom_icon_box'}
					onClick={pressLike}
				></div>
			</div>
		</div>
	)
}

export default ProductCard
