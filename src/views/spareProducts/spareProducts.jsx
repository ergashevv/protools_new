import api from '../../api'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/productCard'
import './spare.scss'

function SpareProducts() {
	const { id } = useParams()
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const { i18n, t } = useTranslation()

	useEffect(() => {
		if (id) {
			api
				.get(
					`/zapchast/products?zapchast_id=${id}&status=ACTIVE`
				)
				.then(response => {
					setProducts(response.data.data)
					setLoading(false)
				})
				.catch(error => {
					console.error('Error fetching products:', error)
					setLoading(false)
				})
		}
	}, [id])

	return (
		<div className='spareProducts'>
			<div className='container'>
				{loading ? (
					<p>{t('loading')}</p>
				) : (
					<div>
						{loading ? (
							<p>{t('loading')}</p>
						) : (
							<div className='spareProducts_wrap'>
								{products.map(product => (
									<ProductCard
										key={product.id}
										title={
											i18n.language === 'uz'
												? product?.name_uz
												: product?.name_ru
										}
										image={product?.image}
										price={product?.price}
										path={`/spare/product/${product?.id}`}
										excerpt={product?.status}
									/>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default SpareProducts
