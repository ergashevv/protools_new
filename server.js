const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const fs = require('fs')
const axios = require('axios')

app.get('/', (req, res) => {
	const filePath = path.resolve(
		__dirname,
		'./build',
		'../public/index.html',
		'index.html'
	)

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			return console.log(err)
		}

		data = data.replace(/\$OG_TITLE/g, 'Your actual OG title')
		data = data.replace(/\$OG_DESCRIPTION/g, 'Your actual OG description')
		data = data.replace(/\$OG_KEYWORDS/g, 'Your actual OG keywords')
		data = data.replace(/\$OG_IMAGE/g, 'Your actual OG image URL')

		let result = data.replace(/\$OG_IMAGE/g)

		res.send(result)
	})
})

app.use(express.static(path.join(__dirname, '../public/index.html')))

app.get('*', (req, res) => {
	const filePath = path.join(__dirname, '../public', '../public/index.html')
	res.sendFile(filePath)
})

app.listen(PORT, () => {
	console.log(`App launched on ${PORT}`)
})
