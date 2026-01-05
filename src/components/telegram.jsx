import React from 'react'
import tg from '../assets/images/telegram.png'
import '../global.scss'

function Telegram() {
	return (
		<div className='contact_menu'>
			<a href='https://t.me/protools_admin'>
				<img src={tg} alt='telegram' />
			</a>
		</div>
	)
}

export default Telegram
