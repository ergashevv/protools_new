import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs'
import { useDataContext } from '../../contexts/DataContext'
import './basket.scss'

function Basket() {
	const {
		carts,
		incrementCartItem,
		decrementCartItem,
		removeCartItem,
		calculateTotalSum,
		showModal,
	} = useDataContext()
	const { t, i18n } = useTranslation()

	return (
		<div className='basket'>
			<Breadcrumbs href={'/basket'} title={`${t('Basket')}`} />
			{carts.length > 0 ? (
				<div className='container basket_main'>
					<div className='basket_wrap'>
						{carts?.map((item, index) => (
							<div className='basket_card' key={index}>
								<div className='basket_card_left'>
									<div className='basket_img'>
										<img
											src={item.images[0]}
											alt={
												i18n.language === 'uz'
													? item.title
													: item.additionalInfos.find(
															info => info.key === 'titleRu'
													  )?.value
											}
										/>
									</div>
									<h3 className='basket_caption'>
										{i18n.language === 'uz'
											? item.title
											: item.additionalInfos.find(
													info => info.key === 'titleRu'
											  )?.value}
									</h3>
								</div>
								<span className='basket_price'>
									{item.price !== 0
										? `${item.price.toLocaleString({
												style: 'currency',
												minimumFractionDigits: 0,
												currency: 'UZS',
										  })} ${t('Sum')}`
										: ''}
								</span>
								<div className='basket_card_right'>
									{item.price !== 0 && (
										<>
											<div className='basket_wrap_count'>
												<button 
													onClick={() => decrementCartItem(item._id)}
													disabled={item.quantity <= 1}
													style={{ opacity: item.quantity <= 1 ? 0.5 : 1, cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer' }}
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='7'
														height='4'
														viewBox='0 0 7 4'
														fill='none'
													>
														<path
															d='M6.42982 0.94043V3.06043H0.569824V0.94043H6.42982Z'
															fill='#4A5056'
														/>
													</svg>
												</button>
												<span>{item.quantity}</span>
												<button 
													onClick={() => incrementCartItem(item._id)}
													disabled={item.quantity >= (item.stockQuantity || item.quantity || 0)}
													style={{ opacity: item.quantity >= (item.stockQuantity || item.quantity || 0) ? 0.5 : 1, cursor: item.quantity >= (item.stockQuantity || item.quantity || 0) ? 'not-allowed' : 'pointer' }}
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='11'
														height='12'
														viewBox='0 0 11 12'
														fill='none'
													>
														<path
															d='M4.47008 11.1496V6.94961H0.330078V5.04961H4.47008V0.849609H6.51008V5.04961H10.6701V6.94961H6.51008V11.1496H4.47008Z'
															fill='#4A5056'
														/>
													</svg>
												</button>
											</div>
											{(item.stockQuantity || item.quantity) && (
												<div style={{ fontSize: '12px', color: '#666', marginTop: '4px', textAlign: 'center' }}>
													Skladda: {item.stockQuantity || item.quantity} ta
												</div>
											)}
										</>
									)}
									<button
										onClick={() => removeCartItem(item._id)}
										className='basket_delete'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='18'
											height='20'
											viewBox='0 0 18 20'
											fill='none'
										>
											<path
												d='M1 5H17M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5M7 10L11 14M11 10L7 14'
												stroke='currentColor'
												strokeWidth='1.7'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</button>
								</div>
							</div>
						))}
					</div>
					<div className='basket_total'>
						<h2>{t('Total')}</h2>
						<div className='basket_total_wrap'>
							<p className='basket_total_value'>{t('Total_cost')}</p>
							<p className='basket_total_key'>
								{`${calculateTotalSum(
									carts.price,
									carts.quantity
								).toLocaleString({
									style: 'currency',
									minimumFractionDigits: 0,
									currency: 'UZS',
								})} ${t('Sum')}`}
							</p>
						</div>
						<button className='basket_buy' onClick={() => showModal()}>
							{t('Buy')}
						</button>
					</div>
				</div>
			) : (
				<div className='no_data'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='104'
						height='77'
						viewBox='0 0 104 77'
						fill='none'
					>
						<path
							d='M2.97363 2H19.624C20.4705 2 21.2253 2.53286 21.5086 3.33047L25.7275 15.2057M25.7275 15.2057L41.0609 58.3664C41.4098 59.3486 42.4545 59.8981 43.4614 59.6292L99.5422 44.6546C100.417 44.4209 101.026 43.6282 101.026 42.7223V17.2057C101.026 16.1012 100.131 15.2057 99.0263 15.2057H25.7275Z'
							stroke='#101828'
							strokeWidth='4'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M55.7282 41.899L55.7291 41.898C57.1785 40.2882 59.1444 39.3838 61.1942 39.3838C63.2439 39.3838 65.2098 40.2882 66.6592 41.898L66.6601 41.899M49.001 31C50.0045 32.0732 51.366 32.6768 52.785 32.6768C54.2042 32.6768 55.5651 32.0738 56.5687 31.0006M65.8192 31C66.8227 32.0732 68.1842 32.6768 69.6033 32.6768C71.0223 32.6768 72.3833 32.0738 73.3869 31.0006'
							stroke='#101828'
							strokeWidth='4'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M26.6928 71C26.6928 73.9455 29.0806 76.3333 32.0261 76.3333C34.9716 76.3333 37.3594 73.9455 37.3594 71C37.3594 68.0545 34.9716 65.6667 32.0261 65.6667C29.0806 65.6667 26.6928 68.0545 26.6928 71ZM28.3945 72H32.0261V70H28.3945V72Z'
							fill='#101828'
						/>
						<path
							d='M69.9047 71C69.9047 73.9455 72.2925 76.3333 75.238 76.3333C78.1835 76.3333 80.5714 73.9455 80.5714 71C80.5714 68.0545 78.1835 65.6667 75.238 65.6667C72.2925 65.6667 69.9047 68.0545 69.9047 71ZM71.6064 72H75.238V70H71.6064V72Z'
							fill='#101828'
						/>
					</svg>
					<h2>{t('Empty_basket')}</h2>
					<p>{t('Empty_basket_info')}.</p>
					<Link to='/'>{t('Redirect_basket')}</Link>
				</div>
			)}
		</div>
	)
}

export default Basket
