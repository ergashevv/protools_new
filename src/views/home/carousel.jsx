import { Skeleton } from 'antd'
import api from '../../api'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import '../../global.scss'
import './home.scss'

const Carousel = () => {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		// Fetch all banners (banner, news, discount) - barcha bannerlar birga ko'rsatiladi
		api
			.get(`/banners`)
			.then(response => {
				setData(response.data.data)
				setLoading(false)
			})
			.catch(error => {
				setLoading(false)
			})
	}, [])

	const settingsTop = {
		autoplay: true,
		autoplaySpeed: 3000,
		infinite: false,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 700,
		responsive: [
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	return (
		<div className='slider container'>
			{loading ? (
				<>
					<Skeleton.Image active className='skeleton_banner' />
				</>
			) : (
				<div className='slider-container'>
					{data.length > 0 ? (
						<Slider {...settingsTop}>
							{data.map((item, index) => {
								// Support both camelCase and snake_case formats for backward compatibility
								const imageUrl = item.imageUrl || item.image_url
								const titleUz = item.title_uz || item.titleUz
								const titleRu = item.title_ru || item.titleRu
								const link = item.link || '#'
								
								return (
									<div className='slider_top' key={index}>
										<Link to={link}>
											<img
												src={imageUrl}
												alt={titleUz || titleRu || 'Banner'}
												width={100}
												height={480}
											/>
										</Link>
									</div>
								)
							})}
						</Slider>
					) : (
						<div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
							Hozirda bannerlar mavjud emas
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Carousel
