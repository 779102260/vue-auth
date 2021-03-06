import insertStyleSheet from './styleSheet.js'
import regDirective from './directive.js'
import wrapComponent from './wrapComponent.js'
import regMinix from './mixin.js'
/**
 * descript
 * @param {Function} Vue
 * @param {Object} [options] 参数
 * {
 *  [globalComponets]: Boolean,
 *  [directive]: Boolean,
 *  [checker]: Function
 * }
 */
const install = function(Vue, options) {
	if (!options) {
		console.error('[vue-auth] Vue.use安装插件时，缺少参数 https://github.com/779102260/vue-auth')
		return
	}
	insertStyleSheet()
	if (typeof options === 'function') {
		options = { checker: options }
	}
	const { globalComponets = true, directive = true, checker } = options
	// 所有全局组件增加权限控制
	if (globalComponets) {
		wrapGlobalComponents(Vue, checker)
	}
	// 局部组件
	regMinix(Vue, checker)
	// 增加v-auth指令（用于非组件）
	if (directive) {
		regDirective(Vue, checker)
	}
	// 部分接口暴露给Vue
	Vue.prototype.wrap = wrapComponent
}

const wrapGlobalComponents = function(Vue, checker) {
	const regedComponents = Vue.options.components
	// eslint-disable-next-line guard-for-in
	for (const name in regedComponents) {
		const config = regedComponents[name]
		// 重新注册组件
		wrapComponent(Vue, {
			name,
			config,
			checker,
			regToGlobal: true
		})
	}
}

export { wrapComponent as wrap, regDirective }
export default install
