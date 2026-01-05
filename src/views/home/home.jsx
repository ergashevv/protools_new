import React from 'react'
import Carousel from './carousel'
import Intro from './intro'
import FamousProduct from '../../components/famousProduct'
import Popularcategories from '../../components/popularcategories'
import NewsSection from './news_section'
import Companies from '../../components/companies'

function Home() {
	return (
		<div className='home'>
			<Carousel />
			<Popularcategories />
			<FamousProduct />
			<NewsSection />
			<Companies />
			<Intro />
		</div>
	)
}

export default Home
