import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }

Vue.use(VueRouter)
Vue.use(ElementUI);
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	// scrollBehavior (to, from, savedPosition) {
	//     if (savedPosition) {
	// 	    return savedPosition
	// 	} else {
	// 		if (from.meta.keepAlive) {
	// 			from.meta.savedPosition = document.body.scrollTop;
	// 		}
	// 	    return { x: 0, y: to.meta.savedPosition || 0 }
	// 	}
	// }
})
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
		if (store.state.login && store.state.userInfo) {  // 通过vuex state获取当前是否存在
			next();
		}
		else {
			next({
				path: '/login',
				query: {redirect: to.path}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	}
	else {
		next();
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

