import { Drawer, Skeleton } from 'antd'
import api from '../api'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import '../global.scss'

function Spare({ isSpare, toggleSpare }) {
	const [spareParts, setSpareParts] = useState([])
	const [loading, setLoading] = useState(true)
	const { i18n } = useTranslation()

	useEffect(() => {
		api
			.get('/zapchast')
			.then(response => {
				setSpareParts(response.data.data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching spare parts:', error)
				setLoading(false)
			})
	}, [])

	return (
		<Drawer
			onClose={toggleSpare}
			open={isSpare}
			placement='top'
			closable={false}
			className='spare_drawer'
		>
			<div className='container'>
				<div className='spare_wrap'>
					{loading ? (
						<Skeleton active paragraph={{ rows: 3 }} />
					) : (
						spareParts.map(sparePart => (
							<Link
								to={`/spare/${sparePart.id}`}
								className='spare_card'
								key={sparePart.id}
								onClick={toggleSpare}
							>
								<img
									src={sparePart?.image}
									alt={
										i18n.language === 'uz'
											? sparePart.name_uz
											: sparePart.name_ru
									}
								/>
								<span className='spare_title'>
									{i18n.language === 'uz'
										? sparePart.name_uz
										: sparePart.name_ru}
								</span>
							</Link>
						))
					)}
				</div>
			</div>
		</Drawer>
	)
}

export default Spare
