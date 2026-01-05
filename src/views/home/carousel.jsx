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
					<Slider {...settingsTop}>
						{data.map((item, index) => (
							<div className='slider_top' key={index}>
								<Link to={item.link}>
									<img
										src={item.imageUrl}
										alt={item.title_uz}
										width={100}
										height={480}
									/>
								</Link>
							</div>
						))}
					</Slider>
				</div>
			)}
		</div>
	)
}

export default Carousel
