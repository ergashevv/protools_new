import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import React from 'react'
import '../global.scss'

function Breadcrumbs({ href_back, title_back, href, title }) {
	return (
		<div className='container' style={{ marginBottom: '40px' }}>
			<Breadcrumb
				items={[
					{
						href: '/',
						title: <HomeOutlined />,
					},
					{
						href: href_back,
						title: title_back,
					},
					{
						href: href,
						title: title,
					},
				]}
			/>
		</div>
	)
}

export default Breadcrumbs
