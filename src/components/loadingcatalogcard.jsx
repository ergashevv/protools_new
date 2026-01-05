import { Skeleton } from 'antd'
import React from 'react'
import '../global.scss'

function Loadingcatalogcard() {
	return (
		<div className='categoryCard'>
			<Skeleton.Image active />
			<Skeleton active paragraph={{ rows: 0 }} />
		</div>
	)
}

export default Loadingcatalogcard
