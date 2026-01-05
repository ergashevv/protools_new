import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import '../../global.scss'
import './notfound.scss'

function NotFound() {
	const { t } = useTranslation()
	return (
		<div className='not_found'>
			<div className='container'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='594'
					height='260'
					viewBox='0 0 594 260'
					fill='none'
				>
					<path
						d='M191.056 154.002V196.718H157.028V255H109.244V196.718H0.643555V149.296L110.692 0.876356H157.028V154.002H191.056ZM109.244 154.002V59.8824L41.9116 154.002H109.244Z'
						fill='#021e34'
					/>
					<path
						d='M298.086 0.152344C370.848 0.152344 390.758 70.3803 390.758 130.11C390.758 210.474 356.006 259.344 298.448 259.344C239.804 259.344 204.69 211.198 204.69 130.11C204.69 70.3803 226.048 0.152344 298.086 0.152344ZM297.724 42.5064C255.37 42.5064 255.37 102.598 255.37 132.644C255.37 190.202 269.126 217.714 298.086 217.714C326.322 217.714 340.078 189.116 340.078 130.11C340.078 69.6564 327.046 42.5064 297.724 42.5064Z'
						fill='#021e34'
					/>
					<path
						d='M593.356 154.002V196.718H559.328V255H511.544V196.718H402.944V149.296L512.992 0.876356H559.328V154.002H593.356ZM511.544 154.002V59.8824L444.212 154.002H511.544Z'
						fill='#021e34'
					/>
				</svg>
				<p>{t('Not_found')}</p>
				<Link to='/'>{t('Main')}</Link>
			</div>
		</div>
	)
}

export default NotFound
