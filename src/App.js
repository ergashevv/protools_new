import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer.jsx'
import Header from './components/header.jsx'
import Product from './views/product/product'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import Telegram from './components/telegram.jsx'
import Translate from './components/translate.jsx'
import ViewProduct from './components/viewProduct.jsx'
import ScrollToTop from './scroltop'
import Basket from './views/basket/basket.jsx'
import Brand from './views/brand/brand.jsx'
import Categories from './views/categories/categories'
import Category from './views/category/category'
import Contact from './views/contact/contact'
import Favorites from './views/favorites/favorites.jsx'
import Home from './views/home/home.jsx'
import News from './views/news/news'
import NotFound from './views/notFound/notFound.jsx'
import SearchResult from './views/searchResult/searchResult.jsx'
import SpareProducts from './views/spareProducts/spareProducts.jsx'
import SpareSingle from './views/spareSingle/spareSingle.jsx'

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Header />
			<Translate />
			<Telegram />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/:slug' element={<Product />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/category' element={<Categories />} />
				<Route path='category/:id' element={<Category />} />
				<Route path='/news' element={<News />} />
				<Route path='/search/:title' element={<SearchResult />} />
				<Route path='/favorites' element={<Favorites />} />
				<Route path='/basket' element={<Basket />} />
				<Route path='/spare/:id' element={<SpareProducts />} />
				<Route path='/spare/product/:id' element={<SpareSingle />} />
				<Route path='/brand/:title' element={<Brand />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<ViewProduct />
			<Footer />
		</BrowserRouter>
	)
}

export default App
