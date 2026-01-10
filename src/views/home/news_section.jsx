import { Skeleton } from 'antd'
import api from '../../api'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import '../../global.scss'
import './home.scss'

function NewsSection() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const { t, i18n } = useTranslation()

	const formatDate = dateString => {
		const options = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}
		const date = new Date(dateString)
		return date.toLocaleDateString('ru-RU', options)
	}

	useEffect(() => {
		api
			.get('/banners?type=news')
			.then(res => {
				setData(res.data.data)
				setLoading(false)
			})
			.catch(err => {
				console.error(err)
				setLoading(false)
			})
	}, [])

	return (
		<div className='news'>
			<div className='container'>
				<div className='news_head'>
					<h2 className='home_headline'>{t('News')}</h2>
					<Link to='/news'>{t('More_news')}</Link>
				</div>

				<div className='news_video_wrap'>
					{loading ? (
						<>
							<div className='news_wrap_skeleton'>
								<Skeleton.Node active />
								<Skeleton active paragraph={{ rows: 2 }} />
							</div>
							<div className='news_wrap_skeleton'>
								<Skeleton.Node active />
								<Skeleton active paragraph={{ rows: 2 }} />
							</div>
							<div className='news_wrap_skeleton'>
								<Skeleton.Node active />
								<Skeleton active paragraph={{ rows: 2 }} />
							</div>
						</>
					) : (
						data?.slice(0, 3).map((video, index) => {
							// Support both camelCase and snake_case formats for backward compatibility
							const excerptUz = video.excerptUz || video.excerpt_uz
							const titleUz = video.titleUz || video.title_uz
							const titleRu = video.titleRu || video.title_ru
							const descriptionUz = video.descriptionUz || video.description_uz
							const descriptionRu = video.descriptionRu || video.description_ru
							const bodyUz = video.bodyUz || video.body_uz
							const bodyRu = video.bodyRu || video.body_ru
							const imageUrl = video.imageUrl || video.image_url
							
							return (
								<div className='news_video' key={index}>
									{excerptUz ? (
										<YouTube videoId={excerptUz} className='video' />
									) : (
										<Link to={video.link || '#'}>
											<img
												src={imageUrl}
												alt={i18n.language === 'uz' ? titleUz : titleRu}
												style={{ width: '100%', height: '200px', objectFit: 'cover' }}
											/>
										</Link>
									)}
									<h3>{i18n.language === 'uz' ? titleUz : titleRu}</h3>
									<p>{i18n.language === 'uz' ? descriptionUz || bodyUz : descriptionRu || bodyRu}</p>
									<span>{formatDate(video.createdAt)}</span>
								</div>
							)
						})
					)}
				</div>
			</div>
		</div>
	)
}

export default NewsSection
