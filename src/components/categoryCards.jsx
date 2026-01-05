import React from 'react'
import '../global.scss'

const CategoryCards = ({ image, text }) => {
	return (
		<div className='categoryCard'>
			<div className='image'>
				<img src={image} alt={text} />
			</div>
			<h3>{text}</h3>
		</div>
	)
}

export default CategoryCards
