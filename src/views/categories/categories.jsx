import { Pagination } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs'
import CategoryCards from '../../components/categoryCards'
import Loadingcatalogcard from '../../components/loadingcatalogcard'
import '../../global.scss'
import './categories.scss'

function Categories() {
	const [data, setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [resultCount, setResultCount] = useState(0)
	const [totalCount, setTotalCount] = useState(0)
	const [pagesCount, setPagesCount] = useState(1)
	const [params] = useState({
		limit: 10,
	})
	const [loading, setLoading] = useState(true)
	const { t, i18n } = useTranslation()

	useEffect(() => {
		const url = new URL(window.location.href)
		const pageParam = url.searchParams.get('page')
		const initialPage = pageParam ? parseInt(pageParam, 10) : 1
		setCurrentPage(initialPage)

		fetchData(initialPage)
	}, [])

	const fetchData = page => {
		axios
			.get(
				`https://api.protools.uz/v1/categories?&limit=${params.limit}&page=${page}`
			)
			.then(res => {
				setData(res.data.data)
				setResultCount(res.data.resultCount)
				setTotalCount(res.data.totalCount)
				setPagesCount(res.data.pagesCount)
				setLoading(false)
			})
			.catch(error => {
				setLoading(false)
				console.error('Error fetching categories:', error)
			})
	}

	const currentPosts = data

	const handlePageChange = page => {
		setCurrentPage(page)
		const url = new URL(window.location.href)
		url.searchParams.set('page', page)
		window.history.pushState({}, '', url)

		fetchData(page) // Fetch data for the new page
		window.scrollTo(0, 0)
	}

	return (
		<div className='categoriesPage'>
			<Breadcrumbs href={window.location.href} title={'categoriesPage'} />
			<div className='container'>
				<div>
					<h2 className='title'>{t('Categories')}</h2>
					<div className='categoriesPage_wrap'>
						{loading ? (
							<>
								<Loadingcatalogcard />
								<Loadingcatalogcard />
								<Loadingcatalogcard />
								<Loadingcatalogcard />
								<Loadingcatalogcard />
								<Loadingcatalogcard />
							</>
						) : (
							currentPosts.length > 0 &&
							currentPosts.map((item, index) => (
								<Link key={index} to={`/category/${item?._id}`}>
									<CategoryCards
										image={item.image}
										text={i18n.language === 'uz' ? item?.title : item?.slug}
									/>
								</Link>
							))
						)}
					</div>
					<Pagination
						current={currentPage}
						total={totalCount}
						pageSize={params.limit}
						onChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default Categories
