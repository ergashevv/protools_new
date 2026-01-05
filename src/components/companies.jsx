import React, { useEffect, useState } from 'react'

import '../global.scss'

import { Skeleton } from 'antd'
import api from '../api'
import { useTranslation } from 'react-i18next'

function Companies() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const { t, i18n } = useTranslation()

	useEffect(() => {
		api
			.get(`/brands`)
			.then(res => {
				setData(res.data.data)
				setLoading(false)
			})
			.catch(err => {
				Error(err)
				setLoading(false)
			})
	}, [])

	return (
		<div className='companies'>
			<div className='container'>
				<h3>{t('Brends')}</h3>
				<div className='companies_wrap'>
					{loading ? (
						<>
							<Skeleton.Image active />
							<Skeleton.Image active />
							<Skeleton.Image active />
							<Skeleton.Image active />
							<Skeleton.Image active />
							<Skeleton.Image active />
							<Skeleton.Image active />
							<Skeleton.Image active />
						</>
					) : (
						data?.map((item, index) => (
							<a
								href={`/brand/${item._id}`}
								className='companies_box'
								key={index}
							>
								<img src={item.image} alt={i18n.language === 'uz' ? item.name_uz : item.name_ru} />
							</a>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default Companies
