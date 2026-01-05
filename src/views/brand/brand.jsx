import { Pagination, Skeleton, Tabs } from 'antd'
import api from '../../api'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import notFound from '../../assets/svg/noData.svg'
import Breadcrumbs from '../../components/breadcrumbs'
import ListCard from '../../components/listCard'
import ProductCard from '../../components/productCard'
import { useDataContext } from '../../contexts/DataContext'
import '../../global.scss'
import './brand.scss'

const { TabPane } = Tabs

function Brand() {
	const { title } = useParams()
	const initialPage =
		parseInt(new URLSearchParams(window.location.search).get('page')) || 1
	const [currentPage, setCurrentPage] = useState(initialPage)
	const [data, setData] = useState({ data: [] })
	const [brand, setBrand] = useState(null)
	const [loading, setLoading] = useState(true)
	const [postsPerPage] = useState(10)
	const [params, setParams] = useState({
		resultCount: 0,
		totalCount: 0,
		currentPage: 1,
		limit: 14,
		pagesCount: 1,
	})
	const { addLike, addCart, isLike, handleShare } = useDataContext()
	const [viewMode, setViewMode] = useState('grid')
	const { t, i18n } = useTranslation()
	const brandTitle = brand ? (i18n.language === 'uz' ? brand.name_uz : brand.name_ru) : title;

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const [productsRes, brandRes] = await Promise.all([
					api.get(`/products?brandId=${title}&page=${currentPage}&limit=${params.limit}&status=ACTIVE`),
					api.get(`/brands/${title}`)
				])

				setData(productsRes.data)
				setBrand(brandRes.data.data)
				setParams({
					resultCount: productsRes.data.pagination?.total || 0,
					totalCount: productsRes.data.pagination?.total || 0,
					currentPage: currentPage,
					limit: params.limit,
					pagesCount: Math.ceil((productsRes.data.pagination?.total || 0) / params.limit),
				})
			} catch (error) {
				console.error('Error fetching brand data:', error)
				setData({ data: [] })
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [title, currentPage, params.limit])

	const handlePageChange = page => {
		setCurrentPage(page)

		const queryParams = new URLSearchParams(window.location.search)
		queryParams.set('page', page)

		const url = window.location.pathname + '?' + queryParams.toString()
		window.history.pushState({}, '', url)

		window.scrollTo(0, 0)
	}

	const toggleViewMode = mode => {
		setViewMode(mode)
	}

	let content
	if (loading) {
		content = <Skeleton active paragraph={{ rows: 0 }} />
	} else if (data.data.length > 0) {
		content = (
			<>
				<h2 className='brandFilter_title'>{`${brandTitle} (${params.totalCount})`}</h2>
				<div className='brandFilter_center'>
					<div className='brandFilter_right'>
						<Tabs defaultActiveKey='grid' onChange={toggleViewMode}>
							<TabPane tab={t('Net')} key='grid'>
								<div
									className={
										viewMode === 'grid' ? 'brandFilter_right_wrap active' : ''
									}
								>
									{data.data.map(item => (
										<ProductCard
											onClick={() => addCart(item)}
											pressLike={() => addLike(item)}
											image={item.images[0]}
											title={
												i18n.language === 'uz'
													? item?.title_uz
													: item?.title_ru
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
							<TabPane tab={t('List')} key='list'>
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
				className='brandFilter_right_not_product'
				width={500}
				height={500}
			/>
		)
	}

	return (
		<div className='brandFilter'>
			<Helmet>
				<title>{`${brandTitle} | Protools`}</title>
				<meta property='og:title' content={`${brandTitle} | Protools`} />
			</Helmet>
			<Breadcrumbs href={window.location.href} title={brandTitle} />
			<div className='container'>{content}</div>
		</div>
	)
}

export default Brand
