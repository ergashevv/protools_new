import { Pagination } from 'antd'
import api from '../../api'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import notFound from '../../assets/svg/noData.svg'
import Loadingcard from '../../components/loadingcard'
import ProductCard from '../../components/productCard'
import { useDataContext } from '../../contexts/DataContext'
import '../../global.scss'
import './searchResult.scss'

function SearchResult() {
	const title = useParams()
	const [data, setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [resultCount, setResultCount] = useState(0)
	const [totalCount, setTotalCount] = useState(0)
	const [pagesCount, setPagesCount] = useState(1)
	const [loading, setLoading] = useState(true)
	const { addLike, addCart, isLike, handleShare } = useDataContext()
	const [params] = useState({
		limit: 14,
	})
	const { t, i18n } = useTranslation()

	useEffect(() => {
		const url = new URL(window.location.href)
		const pageParam = url.searchParams.get('page')
		const initialPage = pageParam ? parseInt(pageParam, 14) : 1
		api
			.get(
				`/products?search=${title.title}&limit=${params.limit}&page=${initialPage}&status=ACTIVE`
			)
			.then(res => {
				setData(res.data.data)
				setResultCount(res.data.pagination?.total || 0)
				setTotalCount(res.data.pagination?.total || 0)
				setPagesCount(Math.ceil((res.data.pagination?.total || 0) / params.limit))
				setCurrentPage(initialPage)
				setLoading(false)
			})
			.catch(err => {
				setLoading(false)
			})
	}, [title, currentPage, params.limit])

	const currentPosts = data

	const handlePageChange = page => {
		setCurrentPage(page)
		const url = new URL(window.location.href)
		url.searchParams.set('page', page)
		window.history.pushState({}, '', url)

		window.scrollTo(0, 0)
	}

	return (
		<div className='search_results'>
			<Helmet>
				<title>
					{`${title.title}`} - {t('Search_result')} | Protools
				</title>
				<meta
					name='description'
					content='Mahsulotlarni qidirib toping va tanlang. Protools - Sizning ishonchli sherqingiz.'
				/>
			</Helmet>
			<div className='container'>
				{loading ? (
					<div className='search_results_wrap_skeleton'>
						<Loadingcard />
						<Loadingcard />
						<Loadingcard />
						<Loadingcard />
						<Loadingcard />
						<Loadingcard />
						<Loadingcard />
						<Loadingcard />
						<Loadingcard />
						<Loadingcard />
					</div>
				) : (
					<div>
						<h2>
							{t('Search_result')} ({data.length}) {t('Ta')}
						</h2>
						<div className={currentPosts.length && 'search_results_wrap'}>
							{currentPosts.length > 0 ? (
								currentPosts?.map((item, index) => (
									<ProductCard
										image={item.images[0]}
										title={
											i18n.language === 'uz'
												? item?.title_uz
												: item?.title_ru
										}
										price={item.price}
										onClick={() => addCart(item)}
										pressLike={() => addLike(item)}
										path={`/product/${item.slug}`}
										like={isLike(item)}
										handlerShare={() => handleShare(item)}
										excerpt={item.excerpt_uz}
										quantity={item.quantity}
										status={item.status}
										key={index}
									/>
								))
							) : (
								<img
									src={notFound}
									alt='not found'
									className='not_data'
									width={500}
									height={500}
								/>
							)}
						</div>
						{currentPosts.length > 0 && (
							<Pagination
								current={currentPage}
								total={totalCount}
								pageSize={params.limit}
								onChange={handlePageChange}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchResult
