module.exports = {
	css: {
		loaderOptions: {
			sass: {
				//imports the index.scss file (and all it's imports like bootstrap) globally (in every vue component)
				//so you don't have to import it manually
				prependData: `
					@import "@/assets/css/index.scss";

				`
			}
		}
	}
};
