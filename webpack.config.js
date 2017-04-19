module.exports = {
	entry: './src/js/index.jsx',
	output: {
		filename: "public/js/bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: /src/,
			loader: "babel-loader",
			query: {
				presets: ["react", "es2015"]
			}
		}]
	}

};
