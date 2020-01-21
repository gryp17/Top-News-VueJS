import Vue from 'vue';
import Vuex from 'vuex';
import articlesModule from '@/store/modules/articles';
import userModule from '@/store/modules/user';
import commentsModule from '@/store/modules/comments';
import modalsModule from '@/store/modules/modals';
import formModule from '@/store/modules/form';
import ConfigService from '@/services/config';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		articles: articlesModule,
		user: userModule,
		comments: commentsModule,
		modals: modalsModule,
		form: formModule
	},
	state: {
		config: {},
		sections: [
			'politics',
			'economy',
			'world',
			'technology',
			'sports'
		],
		mainMenuOpened: false
	},
	getters: {
		articlesDirectory(state) {
			return state.config.uploads.articles.directory;
		},
		avatarsDirectory(state) {
			return state.config.uploads.avatars.directory;
		}
	},
	mutations: {
		setConfig(state, config) {
			state.config = config;
		},
		setMainMenuOpened(state, opened) {
			state.mainMenuOpened = opened;
		}
	},
	actions: {
		getConfig(context) {
			return ConfigService.getConfig().then((res) => {
				if (res.data) {
					const config = res.data;

					//fix the paths
					config.uploads.avatars.directory = config.uploads.avatars.directory.replace(/^\./, '/cdn');
					config.uploads.articles.directory = config.uploads.articles.directory.replace(/^\./, '/cdn');

					context.commit('setConfig', config);
				}

				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to fetch config'
				});
			});
		},
		toggleMainMenu(context) {
			const opened = !context.state.mainMenuOpened;
			context.commit('setMainMenuOpened', opened);
		},
		hideMainMenu(context) {
			context.commit('setMainMenuOpened', false);
		}
	}
});
