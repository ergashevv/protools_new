import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import api from '../api'
import '../global.scss'
import CategoryCards from './categoryCards'
import Loadingcatalogcard from './loadingcatalogcard'

function Popularcategories() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const { t, i18n } = useTranslation()

	useEffect(() => {
		api
			.get(`/categories?featured=true&limit=20`)
			.then(res => {
				setData(res.data.data)
				setLoading(false)
			})
			.catch(err => {
				console.log(err)
				setLoading(false)
			})
	}, [])

	return (
		<div className='Popularcategories'>
			<div className='container'>
				<h2 className='Popularcategories_headline'>{t('Top_category')}</h2>
				<div className='Popularcategories_cards'>
					{loading ? (
						<>
							<Loadingcatalogcard />
							<Loadingcatalogcard />
							<Loadingcatalogcard />
							<Loadingcatalogcard />
							<Loadingcatalogcard />
						</>
					) : (
						data.length > 0 &&
						data?.map((item, index) => (
							<Link to={`category/${item._id}`} key={index}>
								<CategoryCards
									image={item.image}
									text={i18n.language === 'uz' ? item.title_uz : item.title_ru}
								/>
							</Link>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default Popularcategories
