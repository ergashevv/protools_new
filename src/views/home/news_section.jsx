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
			.get('/articles')
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
						data?.slice(0, 3).map((video, index) => (
							<div className='news_video' key={index}>
								<YouTube videoId={video.excerpt_uz} className='video' />
								<h3>{i18n.language === 'uz' ? video.title_uz : video.title_ru}</h3>
								<p>{i18n.language === 'uz' ? video.body_uz : video.body_ru}</p>
								<span>{formatDate(video.createdAt)}</span>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default NewsSection
