import React, { useEffect, useState } from 'react'

import '../global.scss'

import { Skeleton } from 'antd'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

function Companies() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const { t } = useTranslation()

	useEffect(() => {
		axios
			.get(`https://api.protools.uz/v1/brands`)
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
								href={`/brand/${item.name}`}
								className='companies_box'
								key={index}
							>
								<img src={item.image} alt={item.name} />
							</a>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default Companies
