import { Button, Drawer, Input, Select, Skeleton } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { LiaToolsSolid } from 'react-icons/lia'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import api from '../api'
import logo from '../assets/svg/logoProtools.svg'
import { useDataContext } from '../contexts/DataContext'
import '../global.scss'
import Spare from './spare'

function Header() {
	const [limitId, setLimitId] = useState([])
	const [data, setData] = useState([])
	const [catalog, setCatalog] = useState([])
	const [keys, setKey] = useState('')
	const [isOpen, setOpen] = useState(false)
	const [isSpare, setIsSpare] = useState(false)
	const [scroll, setScroll] = useState(false)
	const [showSearchResults, setShowSearchResults] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [loading, setLoading] = useState(true)
	const searchRef = useRef(null)
	const { Search } = Input
	const { carts, likes } = useDataContext()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const transliterate = text => {
		// Define the transliteration map for Cyrillic to Latin
		const cyrillicToLatinMap = {
			а: 'a',
			б: 'b',
			в: 'v',
			г: 'g',
			д: 'd',
			е: 'e',
			ё: 'yo',
			ж: 'zh',
			з: 'z',
			и: 'i',
			й: 'y',
			к: 'k',
			л: 'l',
			м: 'm',
			н: 'n',
			о: 'o',
			п: 'p',
			р: 'r',
			с: 's',
			т: 't',
			у: 'u',
			ф: 'f',
			х: 'x',
			ц: 'ts',
			ч: 'ch',
			ш: 'sh',
			щ: 'sch',
			ы: 'y',
			э: 'e',
			ю: 'yu',
			я: 'ya',
			ғ: 'g',
			қ: 'q',
			ҳ: 'h',
			ў: 'o',
			ў: 'o',
			ъ: '',
			ь: '',
		}

		// Replace Cyrillic characters with their Latin counterparts
		return text
			.split('')
			.map(char => cyrillicToLatinMap[char.toLowerCase()] || char)
			.join('')
	}

	const onSearchChange = e => {
		const { value } = e.target
		const transliteratedValue = transliterate(value.trim())

		setKey(transliteratedValue)

		if (transliteratedValue === '') {
			setData([])
			setShowSearchResults(false)
		} else {
			setShowSearchResults(true)
		}
	}

	const onSearch = value => {
		if (value.trim() === '') {
			return
		} else {
			setKey(value)
			navigate(`/search/${transliterate(value)}`)
			setShowSearchResults(false)
		}
	}

	useEffect(() => {
		if (keys) {
			api
				.get(`/products?search=${keys}&limit=1000&status=ACTIVE`)
				.then(response => {
					setData(response.data.data)
					setShowSearchResults(true)
				})
				.catch(error => {
					console.error('Error fetching search results:', error)
				})
		}

		api
			.get('/categories?limit=100')
			.then(res => {
				setCatalog(res.data.data)
				setLoading(false)
			})
			.catch(err => {
				console.error(err)
				setLoading(false)
			})
	}, [keys])

	const toggleMenu = () => {
		setOpen(!isOpen)
		if (!isOpen) {
			setScroll(false)
		}
		setIsSpare(false)
	}

	const toggleSpare = () => {
		setIsSpare(!isSpare)
		setOpen(false)
	}

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY > 500)
		})
	}, [])

	const handleClickOutside = event => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setShowSearchResults(false)
		}
	}

	const handleCatalogClick = item => {
		setSelectedCategory(item)
	}

	const handlePrevButtonClick = () => {
		setSelectedCategory(null)
	}

	const limitChange = index => {
		setLimitId([...limitId, index])
	}

	const handleChange = e => {
		i18n.changeLanguage(e)
	}

	return (
		<div className={scroll ? 'header header_active' : 'header'}>
			<div className='container header_wrap'>
				<div className='header_left'>
					<Link to='/' className='logo'>
						<img src={logo} alt='logo' />
					</Link>
					<Button type='primary' className='header_btn' onClick={toggleMenu}>
						<HiOutlineViewGrid className='hamburger' />
						{t('Catalog')}
					</Button>
					<Button
						type='primary'
						className='header_btn_spare'
						onClick={toggleSpare}
					>
						{t('spare_part')}
					</Button>
					<div className='search' ref={searchRef}>
						<Search
							placeholder={t('Search_input')}
							onChange={onSearchChange}
							onSearch={onSearch}
							enterButton
						/>
						{keys.trim() !== '' && showSearchResults && data.length > 0 && (
							<div className='search_results'>
								{data.map((item, index) => (
									<Link
										to={`/product/${item.slug}`}
										key={index}
										onClick={() => setKey('')}
										className='search_results_item'
									>
										<div className='search_results_img_wrap'>
											<img
												src={item.images[0]}
												alt={i18n.language === 'uz' ? item.title_uz : item.title_ru}
											/>
										</div>
										<div className='search_results_texts'>
											<h3>{i18n.language === 'uz' ? item.title_uz : item.title_ru}</h3>
											<p>
												{item.price !== 0
													? `${item.price.toLocaleString({
														style: 'currency',
														minimumFractionDigits: 0,
														currency: 'UZS',
													})} ${t('Sum')}`
													: ''}
											</p>
										</div>
									</Link>
								))}
								<Link
									to={`/search/${transliterate(keys)}`}
									onClick={() => setKey('')}
									className='search_results_all'
								>
									{t('Search_bar')} ({data.length})
								</Link>
							</div>
						)}
					</div>
				</div>
				<Drawer
					onClose={toggleMenu}
					open={isOpen}
					placement='top'
					closable={false}
					className='header_drawler'
				>
					<div className='container'>
						<div className='header_drawler_left'>
							{catalog.map((item, index) => (
								<div
									className='header_drawler_left_block'
									id={item._id}
									key={index}
								>
									{loading ? (
										<Skeleton active paragraph={{ rows: 0 }} />
									) : (
										<Link
											to={`/category/${item._id}`}
											onClick={toggleMenu}
											className='header_drawler_left_link'
										>
											<span>
												{i18n.language === 'uz' ? item.title_uz : item.title_ru}
											</span>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='5'
												height='8'
												viewBox='0 0 5 8'
												fill='none'
											>
												<path
													d='M4.35355 4.35355C4.54882 4.15829 4.54882 3.84171 4.35355 3.64645L1.17157 0.464466C0.976311 0.269204 0.659728 0.269204 0.464466 0.464466C0.269204 0.659728 0.269204 0.976311 0.464466 1.17157L3.29289 4L0.464466 6.82843C0.269204 7.02369 0.269204 7.34027 0.464466 7.53553C0.659728 7.7308 0.976311 7.7308 1.17157 7.53553L4.35355 4.35355ZM3 4.5H4V3.5H3V4.5Z'
													fill='currentColor'
												/>
											</svg>
										</Link>
									)}
									<div className='header_drawler_right'>
										<div className='header_drawler_right_menu'>
											{item.children.map(child => (
												<div className='catalog_right_block' key={child._id}>
													<ul
														className={
															limitId.includes(child._id) ? 'limit_active' : ''
														}
													>
														<li key={child._id}>
															<Link
																to={`/category/${child._id}`}
																onClick={toggleMenu}
															>
																{i18n.language === 'uz'
																	? child.title_uz
																	: child.title_ru}
															</Link>
														</li>
														{child.length > 5 ? (
															<span
																className='more'
																onClick={() => limitChange(child.id)}
															>
																{t('Again')} {child.length - 5}
															</span>
														) : (
															''
														)}
													</ul>
												</div>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</Drawer>

				<Spare isSpare={isSpare} toggleSpare={toggleSpare} />

				<Drawer
					onClose={() => {
						toggleMenu()
						setSelectedCategory()
					}}
					open={isOpen}
					placement='left'
					closable={false}
					className='header_mobile_drawler'
					width={'100%'}
				>
					{selectedCategory ? (
						<div className='header_mobile_children'>
							<span onClick={handlePrevButtonClick}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='14'
									height='12'
									viewBox='0 0 14 12'
									fill='none'
								>
									<path
										d='M0.505025 5.50502C0.231658 5.77839 0.231658 6.22161 0.505025 6.49497L4.9598 10.9497C5.23316 11.2231 5.67638 11.2231 5.94975 10.9497C6.22311 10.6764 6.22311 10.2332 5.94975 9.9598L1.98995 6L5.94975 2.0402C6.22311 1.76683 6.22311 1.32362 5.94975 1.05025C5.67638 0.776885 5.23317 0.776885 4.9598 1.05025L0.505025 5.50502ZM14 5.3L1 5.3L1 6.7L14 6.7L14 5.3Z'
										fill='#8A9198'
									/>
								</svg>{' '}
								{i18n.language === 'uz' ? selectedCategory.title_uz : selectedCategory.title_ru}
							</span>
							{selectedCategory?.children.map((child, index) => (
								<Link
									to={`/category/${child._id}`}
									onClick={() => {
										toggleMenu()
										setSelectedCategory()
									}}
									key={index}
								>
									{i18n.language === 'uz' ? child.title_uz : child.title_ru}
								</Link>
							))}
						</div>
					) : (
						<>
							<div className='header_mobile_parent'>
								{catalog.map((item, index) => (
									<div
										key={index}
										className='header_mobile_parent_wrap'
										onClick={() => handleCatalogClick(item)}
									>
										<h3>{i18n.language === 'uz' ? item.title_uz : item.title_ru}</h3>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='5'
											height='8'
											viewBox='0 0 5 8'
											fill='none'
										>
											<path
												d='M4.35355 4.35355C4.54882 4.15829 4.54882 3.84171 4.35355 3.64645L1.17157 0.464466C0.976311 0.269204 0.659728 0.269204 0.464466 0.464466C0.269204 0.659728 0.269204 0.976311 0.464466 1.17157L3.29289 4L0.464466 6.82843C0.269204 7.02369 0.269204 7.34027 0.464466 7.53553C0.659728 7.7308 0.976311 7.7308 1.17157 7.53553L4.35355 4.35355ZM3 4.5H4V3.5H3V4.5Z'
												fill='#919AA3'
											/>
										</svg>
									</div>
								))}
							</div>
							<div className='header_nav_wrap'>
								<NavLink to={'/favorites'} onClick={() => setOpen(false)}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='33'
										height='26'
										viewBox='0 0 33 26'
										fill='none'
									>
										<path
											d='M17 8.5C17 8.5 18.4034 3.5 22.8475 3.5C26.3092 3.5 28.5 6.3666 28.5 9.7626C28.5 14.4594 23.9359 17.5694 17 23.5C10.0642 17.5694 5.5 14.4594 5.5 9.7626C5.5 6.3666 7.69085 3.5 11.1525 3.5C15.5966 3.5 17 8.5 17 8.5Z'
											stroke='currentColor'
											strokeWidth='1.6'
											strokeMiterlimit='10'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									{t('Favorites')}
									<span className={likes.length > 0 ? 'qty' : 'none'}>
										{likes.length}
									</span>
								</NavLink>
								<NavLink to={'/news'} onClick={() => setOpen(false)}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										x='0px'
										y='0px'
										width='20.4'
										height='20.4'
										viewBox='0 0 30 30'
										className='news_icon'
									>
										<path d='M 4 4 L 4 24 C 4 25.1 4.9 26 6 26 L 18 26 L 20 24 L 24 20 L 26 18 L 26 4 L 25 4 L 23 5 L 21.019531 4 L 19 5 L 16.972656 4 L 15 5 L 13.039062 4 L 11 5 L 9.0214844 4 L 7 5 L 4.9726562 4 L 4 4 z M 9.0117188 6.2363281 L 10.097656 6.7851562 L 10.986328 7.234375 L 11.880859 6.796875 L 13.021484 6.2363281 L 14.091797 6.78125 L 14.996094 7.2441406 L 15.904297 6.7832031 L 16.984375 6.2363281 L 18.115234 6.7949219 L 19.001953 7.2304688 L 19.886719 6.7929688 L 21.011719 6.2363281 L 22.097656 6.7851562 L 22.994141 7.2382812 L 23.894531 6.7890625 L 24 6.7363281 L 24 18 L 20 18 L 16 18 L 16 19 L 18 19 L 18 20 L 16 20 L 16 21 L 18 21 L 18 24 L 6 24 L 6 6.7363281 L 6.1152344 6.7949219 L 7.0019531 7.2304688 L 7.8867188 6.7929688 L 9.0117188 6.2363281 z M 8 9 L 8 11 L 22 11 L 22 9 L 8 9 z M 8 12 L 8 19 L 15 19 L 15 12 L 8 12 z M 16 12 L 16 13 L 22 13 L 22 12 L 16 12 z M 10 13 L 10 14 L 11 13 L 13 13 L 14 14 L 12 14 L 12 16 L 13 15 L 14 15 L 14 16 L 14 17 L 13 18 L 10 18 L 9 17 L 9 14 L 10 13 z M 12 16 L 11 17 L 13 17 L 13 16 L 12 16 z M 11 17 L 11 14 L 10 14 L 10 17 L 11 17 z M 16 14 L 16 15 L 22 15 L 22 14 L 16 14 z M 16 16 L 16 17 L 22 17 L 22 16 L 16 16 z M 8 20 L 8 21 L 15 21 L 15 20 L 8 20 z'></path>
									</svg>
									{t('News')}
								</NavLink>
								<NavLink to={'/contact'} onClick={() => setOpen(false)}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='34'
										height='26'
										viewBox='0 0 34 26'
										fill='none'
									>
										<rect
											x='6.8'
											y='3.3'
											width='20.4'
											height='20.4'
											rx='7.2'
											stroke='currentColor'
											strokeWidth='1.6'
										/>
										<path
											d='M14.1089 13.9472C13.3421 13.1803 12.9113 12.1403 12.9113 11.0559C12.9113 9.97144 13.3421 8.93142 14.1089 8.1646C14.8758 7.39778 15.9158 6.96699 17.0002 6.96699C18.0847 6.96699 19.1247 7.39778 19.8915 8.1646C20.6583 8.93142 21.0891 9.97144 21.0891 11.0559C21.0891 12.1403 20.6583 13.1803 19.8915 13.9472C19.1247 14.714 18.0847 15.1448 17.0002 15.1448C15.9158 15.1448 14.8758 14.714 14.1089 13.9472Z'
											stroke='currentColor'
											strokeWidth='1.6'
										/>
										<path
											d='M24.3337 22.0554C24.3337 18.3054 21.0504 15.9443 17.0003 15.9443C12.9502 15.9443 9.66699 18.3054 9.66699 22.0554'
											stroke='currentColor'
											strokeWidth='1.6'
										/>
									</svg>
									{t('Contact')}
								</NavLink>
							</div>
						</>
					)}
				</Drawer>
				<div className='header_list_wrap'>
					<div className='btn_mobile_wrap'>
						<HiOutlineViewGrid
							className='hamburger_mobile'
							onClick={toggleMenu}
						/>
						<LiaToolsSolid
							className='hamburger_spare_mobile'
							onClick={toggleSpare}
						/>
					</div>
					<Link
						to='/'
						className='header_mobile_logo'
						onClick={() => setOpen(false)}
					>
						<img src={logo} alt='logo' />
					</Link>
					<ul className='header_list'>
						<li className='header_list_item'>
							<NavLink to={'/favorites'}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='33'
									height='26'
									viewBox='0 0 33 26'
									fill='none'
								>
									<path
										d='M17 8.5C17 8.5 18.4034 3.5 22.8475 3.5C26.3092 3.5 28.5 6.3666 28.5 9.7626C28.5 14.4594 23.9359 17.5694 17 23.5C10.0642 17.5694 5.5 14.4594 5.5 9.7626C5.5 6.3666 7.69085 3.5 11.1525 3.5C15.5966 3.5 17 8.5 17 8.5Z'
										stroke='currentColor'
										strokeWidth='1.6'
										strokeMiterlimit='10'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								{t('Favorites')}
								<span className={likes.length > 0 ? 'qty' : 'none'}>
									{likes.length}
								</span>
							</NavLink>
						</li>
						<li className='header_list_item'>
							<NavLink to={'/news'}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									x='0px'
									y='0px'
									width='20.4'
									height='20.4'
									viewBox='0 0 30 30'
									className='news_icon'
								>
									<path d='M 4 4 L 4 24 C 4 25.1 4.9 26 6 26 L 18 26 L 20 24 L 24 20 L 26 18 L 26 4 L 25 4 L 23 5 L 21.019531 4 L 19 5 L 16.972656 4 L 15 5 L 13.039062 4 L 11 5 L 9.0214844 4 L 7 5 L 4.9726562 4 L 4 4 z M 9.0117188 6.2363281 L 10.097656 6.7851562 L 10.986328 7.234375 L 11.880859 6.796875 L 13.021484 6.2363281 L 14.091797 6.78125 L 14.996094 7.2441406 L 15.904297 6.7832031 L 16.984375 6.2363281 L 18.115234 6.7949219 L 19.001953 7.2304688 L 19.886719 6.7929688 L 21.011719 6.2363281 L 22.097656 6.7851562 L 22.994141 7.2382812 L 23.894531 6.7890625 L 24 6.7363281 L 24 18 L 20 18 L 16 18 L 16 19 L 18 19 L 18 20 L 16 20 L 16 21 L 18 21 L 18 24 L 6 24 L 6 6.7363281 L 6.1152344 6.7949219 L 7.0019531 7.2304688 L 7.8867188 6.7929688 L 9.0117188 6.2363281 z M 8 9 L 8 11 L 22 11 L 22 9 L 8 9 z M 8 12 L 8 19 L 15 19 L 15 12 L 8 12 z M 16 12 L 16 13 L 22 13 L 22 12 L 16 12 z M 10 13 L 10 14 L 11 13 L 13 13 L 14 14 L 12 14 L 12 16 L 13 15 L 14 15 L 14 16 L 14 17 L 13 18 L 10 18 L 9 17 L 9 14 L 10 13 z M 12 16 L 11 17 L 13 17 L 13 16 L 12 16 z M 11 17 L 11 14 L 10 14 L 10 17 L 11 17 z M 16 14 L 16 15 L 22 15 L 22 14 L 16 14 z M 16 16 L 16 17 L 22 17 L 22 16 L 16 16 z M 8 20 L 8 21 L 15 21 L 15 20 L 8 20 z'></path>
								</svg>
								{t('News')}
							</NavLink>
						</li>
						<li className='header_list_item'>
							<NavLink to={'/contact'}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='34'
									height='26'
									viewBox='0 0 34 26'
									fill='none'
								>
									<rect
										x='6.8'
										y='3.3'
										width='20.4'
										height='20.4'
										rx='7.2'
										stroke='currentColor'
										strokeWidth='1.6'
									/>
									<path
										d='M14.1089 13.9472C13.3421 13.1803 12.9113 12.1403 12.9113 11.0559C12.9113 9.97144 13.3421 8.93142 14.1089 8.1646C14.8758 7.39778 15.9158 6.96699 17.0002 6.96699C18.0847 6.96699 19.1247 7.39778 19.8915 8.1646C20.6583 8.93142 21.0891 9.97144 21.0891 11.0559C21.0891 12.1403 20.6583 13.1803 19.8915 13.9472C19.1247 14.714 18.0847 15.1448 17.0002 15.1448C15.9158 15.1448 14.8758 14.714 14.1089 13.9472Z'
										stroke='currentColor'
										strokeWidth='1.6'
									/>
									<path
										d='M24.3337 22.0554C24.3337 18.3054 21.0504 15.9443 17.0003 15.9443C12.9502 15.9443 9.66699 18.3054 9.66699 22.0554'
										stroke='currentColor'
										strokeWidth='1.6'
									/>
								</svg>
								{t('Contact')}
							</NavLink>
						</li>

						<li className='header_list_item'>
							<NavLink to={'/basket'}>
								<HiOutlineShoppingBag className='cart' />
								{t('Basket')}
								<span className={carts.length > 0 ? 'qty' : 'none'}>
									{carts.length}
								</span>
							</NavLink>
						</li>
						<li className='header_list_item'>
							<Select
								style={{ width: 50, height: 40 }}
								defaultValue='Uz'
								onChange={handleChange}
								options={[
									{
										value: 'uz',
										label: 'Uz',
									},
									{
										value: 'ru',
										label: 'Ru',
									},
								]}
							/>
						</li>
					</ul>
					<ul className='header_list'>
						<li className='header_list_item' onClick={() => setOpen(false)}>
							<NavLink to={'/basket'}>
								<HiOutlineShoppingBag className='cart' />
								{t('Basket')}
								<span className={carts.length > 0 ? 'qty' : 'none'}>
									{carts.length}
								</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Header
