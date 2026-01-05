import { Pagination, Skeleton, Tabs } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import notFound from '../../assets/svg/noData.svg'
import Breadcrumbs from '../../components/breadcrumbs'
import ListCard from '../../components/listCard'
import Loadingcard from '../../components/loadingcard'
import ProductCard from '../../components/productCard'
import { useDataContext } from '../../contexts/DataContext'
import '../../global.scss'
import './category.scss'

const { TabPane } = Tabs

function Category() {
	const { id } = useParams()
	const initialPage =
		parseInt(new URLSearchParams(window.location.search).get('page')) || 1
	const [currentPage, setCurrentPage] = useState(initialPage)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [postsPerPage] = useState(10)
	const [title, setTitle] = useState([])
	const [params, setParams] = useState({
		resultCount: 1,
		totalCount: 1,
		currentPage: 1,
		limit: 14,
		pagesCount: 1,
	})
	const URL = 'https://api.protools.uz/v1'
	const { addLike, addCart, isLike, handleShare } = useDataContext()
	const [viewMode, setViewMode] = useState('grid')
	const { t, i18n } = useTranslation()

	useEffect(() => {
		axios
			.get(`${URL}/categories`)
			.then(res => {
				setTitle(
					res?.data?.data
						.flatMap(i => [i, ...i.children])
						.filter(child => child._id === id)
						.map(child => child)
				)
			})
			.catch(err => {})
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`${URL}/products/?category.oid=${id}&page=${currentPage}&limit=${params.limit}`
				)

				setData(res.data)
				setParams({
					resultCount: res.data.resultCount,
					totalCount: res.data.totalCount,
					currentPage: currentPage,
					limit: params.limit,
					pagesCount: Math.ceil(res.data.totalCount / params.limit),
				})
				setLoading(false)
			} catch (error) {
				setLoading(false)
			}
		}

		fetchData()
	}, [id, currentPage, params.limit, URL])

	const handlePageChange = page => {
		setCurrentPage(page)

		const queryParams = new URLSearchParams(window.location.search)
		queryParams.set('page', page)

		const url = window.location.pathname + '?' + queryParams.toString()
		window.history.pushState({}, '', url)

		window.scrollTo(0, 0)
	}

	const titleObject = title?.[0] || {}
	const toggleViewMode = mode => {
		setViewMode(mode)
	}

	let content
	if (loading) {
		content = (
			<>
				<Skeleton active paragraph={{ rows: 0 }} />
				<div className='categoryFilter_center'>
					<div className='categoryFilter_right'>
						<Tabs defaultActiveKey='grid' onChange={toggleViewMode}>
							<TabPane tab={t('Net')} key='grid'>
								<div
									className={
										viewMode === 'grid'
											? 'categoryFilter_right_wrap active'
											: ''
									}
								>
									<Loadingcard />
									<Loadingcard />
									<Loadingcard />
									<Loadingcard />
									<Loadingcard />
								</div>
							</TabPane>
							<TabPane tab={t('List')} key='list'>
								<div
									className={
										viewMode === 'list' ? 'list_show active' : 'list_show'
									}
								>
									<div className='list_card_loading'>
										<Skeleton.Image active />
										<Skeleton active paragraph={{ rows: 2 }} />
									</div>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</>
		)
	} else if (data?.data?.length > 0) {
		content = (
			<>
				<h2 className='categoryFilter_title'>{`${
					i18n.language === 'uz' ? titleObject.slug : titleObject.title
				} (${data?.totalCount})`}</h2>
				<div className='categoryFilter_center'>
					<div className='categoryFilter_right'>
						<Tabs defaultActiveKey='grid' onChange={toggleViewMode}>
							<TabPane tab='сетка' key='grid'>
								<div
									className={
										viewMode === 'grid'
											? 'categoryFilter_right_wrap active'
											: ''
									}
								>
									{data?.data?.map(item => (
										<ProductCard
											onClick={() => addCart(item)}
											pressLike={() => addLike(item)}
											image={item.images[0]}
											title={
												i18n.language === 'uz'
													? item?.title
													: item?.additionalInfos.find(
															info => info.key === 'titleRu'
													  )?.value
											}
											price={item.price}
											path={`/product/${item.slug}`}
											handlerShare={() => handleShare(item)}
											like={isLike(item)}
											excerpt={item.excerpt}
											key={item._id}
										/>
									))}
								</div>
							</TabPane>
							<TabPane tab='список' key='list'>
								<div
									className={
										viewMode === 'list' ? 'list_show active' : 'list_show'
									}
								>
									{data?.data?.map(item => (
										<ListCard data={item} key={item._id} />
									))}
								</div>
							</TabPane>
						</Tabs>
					</div>
					{params.resultCount > 0 && (
						<Pagination
							current={currentPage}
							total={params.totalCount}
							pageSize={postsPerPage}
							onChange={handlePageChange}
						/>
					)}
				</div>
			</>
		)
	} else {
		content = (
			<img
				src={notFound}
				alt='not found'
				className='categoryFilter_right_not_product'
				width={500}
				height={500}
			/>
		)
	}

	return (
		<div className='categoryFilter'>
			<Helmet>
				<title>{`${titleObject.title || 'Protools'}`}</title>
				<meta
					property='og:title'
					content={`${titleObject.title || 'Protools'}`}
				/>
				<meta
					property='og:description'
					content={`${titleObject.description || ''}`}
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content={`https://www.protools.uz/category`} />
				<meta property='og:image' content={titleObject.image?.[0] || ''} />
			</Helmet>
			<Breadcrumbs
				href={window.location.href}
				title={`${
					i18n.language === 'uz'
						? titleObject.slug || 'Loading...'
						: titleObject.title || 'Loading...'
				}`}
			/>
			<div className='container'>{content}</div>
		</div>
	)
}

export default Category
