import { Button, Form, Input, Modal, notification } from 'antd'
import axios from 'axios'
import React, { createContext, useContext, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import '../assets/context.scss'

const DataContext = createContext()

export const useDataContext = () => {
	return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
	const [likes, setLikes] = useState(
		JSON.parse(localStorage.getItem('likes')) || []
	)
	const [carts, setCarts] = useState(
		JSON.parse(localStorage.getItem('carts')) || []
	)

	const [orderModalVisible, setOrderModalVisible] = useState(false)
	const [userData, setUserData] = useState({
		username: '',
		telephone: '+998 (90)',
	})
	const formRef = useRef(null)

	const validateUsername = value => {
		return !!value.trim()
	}

	const showModal = () => {
		setOrderModalVisible(true)
	}

	const handleCancel = () => {
		setOrderModalVisible(false)
	}

	const addLike = product => {
		const existingProduct = likes.find(p => p?._id === product?._id)

		if (!existingProduct) {
			const updatedLikes = [...likes, product]
			setLikes(updatedLikes)
			localStorage.setItem('likes', JSON.stringify(updatedLikes))
		} else {
			const updatedLikes = likes.filter(p => p?._id !== product?._id)
			setLikes(updatedLikes)
			localStorage.setItem('likes', JSON.stringify(updatedLikes))
		}
	}

	const addCart = product => {
		const existingProduct = carts.find(p => p?._id === product?._id)

		if (existingProduct) {
			const updatedCarts = carts.map(p =>
				p._id === product?._id ? { ...p, quantity: p.quantity + 1 } : p
			)
			setCarts(updatedCarts)
			localStorage.setItem('carts', JSON.stringify(updatedCarts))
		} else {
			const updatedCarts = [...carts, { ...product, quantity: 1 }]
			setCarts(updatedCarts)
			localStorage.setItem('carts', JSON.stringify(updatedCarts))
		}
	}

	const handleShare = async product => {
		try {
			await navigator.share({
				title: `${product?.title} | Protools`,
				text: product?.description,
				image: product?.images[0],
				url: `https://www.protools.uz/product/${product.slug}`,
			})
		} catch (error) {
			console.error('Error sharing:', error)
		}
	}

	const isLike = product => {
		return likes.some(p => p?._id === product?._id)
	}

	const calculateTotalSum = () => {
		return carts.reduce((total, item) => total + item.price * item.quantity, 0)
	}

	const incrementCartItem = productId => {
		const updatedCarts = carts.map(p =>
			p._id === productId ? { ...p, quantity: p.quantity + 1 } : p
		)
		setCarts(updatedCarts)
		localStorage.setItem('carts', JSON.stringify(updatedCarts))
	}

	const decrementCartItem = productId => {
		const updatedCarts = carts.map(p =>
			p._id === productId && p.quantity > 1
				? { ...p, quantity: p.quantity - 1 }
				: p
		)
		setCarts(updatedCarts)
		localStorage.setItem('carts', JSON.stringify(updatedCarts))
	}

	const removeCartItem = productId => {
		const updatedCarts = carts.filter(p => p._id !== productId)
		setCarts(updatedCarts)
		localStorage.setItem('carts', JSON.stringify(updatedCarts))
	}

	const handleFinish = async () => {
		if (!userData.telephone.trim() || !userData.username.trim()) {
			return
		}

		if (userData.telephone.trim().length < 12) {
			notification.error({
				message: 'Error',
				description: "Telefon raqamingizni to'liq kiriting.",
			})
			return
		}

		const orderData = {
			products: carts.map(item => ({
				productName: item.title,
				productLink: `https://www.protools.uz/product/${item.slug}`,
				name: userData.username,
				tell: userData.telephone,
				count: item.quantity,
			})),
		}

		try {
			const response = await axios.post(
				'https://api2.protools.uz/api/order/',
				orderData
			)
			setCarts([])
			localStorage.removeItem('carts')
			setOrderModalVisible(false)

			notification.success({
				message: 'Buyurtmangiz qabul qilindi',
				description: "Tez orada siz bilan bog'lanamiz.",
			})

			formRef.current.resetFields()
		} catch (error) {
			console.log(error)
			notification.error({
				message: 'Error',
				description:
					"Buyurtmani berishda xatolik yuz berdi. Iltimos keyinroq qayta urinib ko'ring.",
			})
		}
	}

	return (
		<DataContext.Provider
			value={{
				likes,
				carts,
				addLike,
				addCart,
				handleShare,
				isLike,
				showModal,
				userData,
				setUserData,
				incrementCartItem,
				decrementCartItem,
				removeCartItem,
				calculateTotalSum,
			}}
		>
			{children}
			<Modal
				title='Buyurtma berish'
				open={orderModalVisible}
				onCancel={handleCancel}
				footer={[
					<Button key='back' onClick={handleCancel}>
						Bekor qilish
					</Button>,
					<Button key='submit' type='primary' onClick={handleFinish}>
						Buyurtma berish
					</Button>,
				]}
			>
				<Form ref={formRef} onFinish={handleFinish}>
					<Form.Item
						label='Ism'
						name='username'
						rules={[
							{
								required: true,
								message: 'Iltimos, foydalanuvchi isminngizni kiriting!',
							},
						]}
					>
						<Input
							value={userData.username}
							onChange={e =>
								setUserData(prevData => ({
									...prevData,
									username: e.target.value,
								}))
							}
						/>
					</Form.Item>
					<Form.Item
						label='Telefon raqamingiz'
						name='telephone'
						rules={[
							{
								required: true,
								message: 'Iltimos, telefon raqamingizni kiriting!',
							},
							{
								validator: (_, value) =>
									validateUsername(value)
										? Promise.resolve()
										: Promise.reject('Username is required'),
							},
						]}
					>
						<PhoneInput
							country={'uz'}
							onlyCountries={['uz']}
							masks={{ uz: '(..) ...-..-..' }}
							countryCodeEditable={false}
							autoFocus={true}
							specialLabel=''
							inputProps={{
								autoFocus: true,
								required: true,
							}}
							value={userData.telephone}
							onChange={value =>
								setUserData(prevData => ({
									...prevData,
									telephone: value,
								}))
							}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</DataContext.Provider>
	)
}
