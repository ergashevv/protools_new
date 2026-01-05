import React, { useState } from 'react'
import { Slider } from 'antd'

const onChange = value => {
	console.log('onChange: ', value)
}
const onAfterChange = value => {
	console.log('onAfterChange: ', value)
}

function Filter() {
	return (
		<div className='filter'>
			<h3 className='filter_headline'>Tovarni filtrlash</h3>
			<div className='filter_main'>
				<label className='filter_main_search'>
					<button>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
						>
							<path
								d='M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z'
								stroke='#667085'
								strokeWidth='1.66667'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
					<input placeholder='Search' />
				</label>

				<div className='filter_brand'>
					<h2>Brandlar</h2>
					<div className='filter_brand_block'>
						<label>
							<input type='checkbox' />
							<span>Bosch</span>
						</label>
						<label>
							<input type='checkbox' />
							<span>Epa</span>
						</label>
						<label>
							<input type='checkbox' />
							<span>Mikitta</span>
						</label>
						<label>
							<input type='checkbox' />
							<span>Stihl</span>
						</label>
						<label>
							<input type='checkbox' />
							<span>DeWalt</span>
						</label>
						<label>
							<input type='checkbox' />
							<span>Milwaukee</span>
						</label>
						<label>
							<input type='checkbox' />
							<span>Pechata</span>
						</label>
					</div>
				</div>
				<hr />

				<div className='filter_brand'>
					<h2>Zarb tezligi, z/daq</h2>
					<div className='filter_brand_block'>
						<label>
							<input type='checkbox' />
							<span>2600</span>
						</label>
						<label>
							<input type='checkbox' />
							<span>2800</span>
						</label>
						<label>
							<input type='checkbox' />
							<span>1300-2900</span>
						</label>
					</div>
				</div>

				<hr />
				<div className='filter_price'>
					<h2>Quvvat sarfi, Vt</h2>
					<Slider style={{ display: 'none' }} />
					<Slider
						range
						step={10}
						defaultValue={[0, 1000]}
						onChange={onChange}
						onAfterChange={onAfterChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default Filter
