import { Skeleton } from 'antd'
import React from 'react'
import '../global.scss'

function Loadingcard() {
	return (
		<div className='product_card'>
			<div className='product_card_image_wrap'>
				<Skeleton.Image active />
			</div>
			<Skeleton active paragraph={{ rows: 2 }} />
		</div>
	)
}

export default Loadingcard
