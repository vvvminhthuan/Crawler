const path = require('path')

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'public/scss')],
	},
	distDir: 'production',
	images: {
		domains: [`${process.env.NEXT_PUBLIC_TEST}`],
	},
}