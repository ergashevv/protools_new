import { Pagination, Skeleton } from 'antd'
import api from '../../api'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import notData from '../../assets/svg/noData.svg'
import '../../global.scss'
import './news.scss'

import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../components/breadcrumbs'

function News() {
	const [data, setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(10)
	const [resultCount, setResultCount] = useState(0)
	const [totalCount, setTotalCount] = useState(0)
	const [pagesCount, setPagesCount] = useState(1)
	const [loading, setLoading] = useState(true)
	const { t, i18n } = useTranslation()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const url = new URL(window.location.href)
				const pageParam = url.searchParams.get('page')
				const initialPage = pageParam ? parseInt(pageParam, 10) : 1

				const response = await api.get(
					`/banners?type=news&limit=${postsPerPage}&page=${initialPage}`
				)
				setData(response.data.data)
				setResultCount(response.data.pagination?.total || 0)
				setTotalCount(response.data.pagination?.total || 0)
				setPagesCount(Math.ceil((response.data.pagination?.total || 0) / postsPerPage))
				setCurrentPage(initialPage)
				setLoading(false)
			} catch (error) {
				setLoading(false)
			}
		}

		fetchData()
	}, [currentPage, postsPerPage])

	const currentPosts = data

	const handleChangePage = page => {
		setCurrentPage(page)
		const url = new URL(window.location.href)
		url.searchParams.set('page', page)
		window.history.pushState({}, '', url)

		window.scrollTo(0, 0)
	}

	const formatDate = dateString => {
		const options = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}
		const date = new Date(dateString)
		return date.toLocaleDateString('ru-RU', options)
	}

	console.log(currentPosts)
	return (
		<div className='newsPage'>
			<Helmet>
				<title>{t('News')} | Protools</title>
				<meta
					name='description'
					content={`Elektr asboblari do'konlari tarmog'idagi eng so'nggi yangiliklar. Qiziqarli o'zgarishlar va chegirma tadbirlari haqida ma'lumotlar.`}
				/>
			</Helmet>
			<Breadcrumbs href={window.location.href} title={`${t('News')}`} />
			<div className='container'>
				<h2 className='title'>{t('News')}</h2>
				<div className={currentPosts.length && 'newsPage_wrap'}>
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
					) : resultCount > 0 ? (
						currentPosts.map((item, index) => {
							// Support both camelCase and snake_case formats for backward compatibility
							const excerptUz = item.excerpt_uz || item.excerptUz
							const titleUz = item.title_uz || item.titleUz
							const titleRu = item.title_ru || item.titleRu
							const bodyUz = item.body_uz || item.bodyUz
							const bodyRu = item.body_ru || item.bodyRu
							const imageUrl = item.image_url || item.imageUrl
							
							return (
								<div className='news_video' key={index}>
									{excerptUz ? (
										<YouTube videoId={excerptUz} className='video' />
									) : (
										item.link ? (
											<Link to={item.link}>
												<img
													src={imageUrl}
													alt={i18n.language === 'uz' ? titleUz : titleRu}
													style={{ width: '100%', height: '200px', objectFit: 'cover' }}
												/>
											</Link>
										) : (
											<img
												src={imageUrl}
												alt={i18n.language === 'uz' ? titleUz : titleRu}
												style={{ width: '100%', height: '200px', objectFit: 'cover' }}
											/>
										)
									)}
									<h3>{i18n.language === 'uz' ? titleUz : titleRu}</h3>
									<p>{i18n.language === 'uz' ? bodyUz || item.description_uz || item.descriptionUz : bodyRu || item.description_ru || item.descriptionRu}</p>
									<span>{formatDate(item.createdAt)}</span>
								</div>
							)
						})
					) : (
						<img
							src={notData}
							alt='not data'
							className='not_data'
							width={500}
							height={500}
						/>
					)}
				</div>
				{resultCount > 0 && (
					<Pagination
						current={currentPage}
						total={totalCount}
						pageSize={postsPerPage}
						onChange={handleChangePage}
					/>
				)}
			</div>
		</div>
	)
}

export default News
