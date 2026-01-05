import { Drawer, Skeleton } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import '../global.scss'

function Spare({ isSpare, toggleSpare }) {
	const [spareParts, setSpareParts] = useState([])
	const [loading, setLoading] = useState(true)
	const { i18n } = useTranslation()

	useEffect(() => {
		axios
			.get('https://back2.protools.uz/api/zapchast/')
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
									src={`http://167.71.68.40/${sparePart?.image}`}
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
