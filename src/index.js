/* eslint-disable guard-for-in */
/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */

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
let optionsRecord
const install = function(Vue, options) {
	if (!options) {
		return
	}
	if (typeof options === 'function') {
		options = { checker: options }
	}
	if (!options.checker) {
		options.checker = defaultCheckAuthFn
	}
	const { globalComponets = true, directive = true, checker } = options
	// 备份
	optionsRecord = options
	// 所有全局组件增加权限控制
	if (globalComponets) {
		wrapRegedComponents(Vue, checker)
	}
	// 局部组件
	regMinix(Vue)
	// 增加v-auth指令（用于非组件）
	if (directive) {
		regDirective(Vue, checker)
	}
	// 部分接口暴露给Vue
	Vue.prototype.wrap = wrapComponent
}

const wrapRegedComponents = function(Vue, checkAtuhFn) {
	const regedComponents = Vue.options.components
	for (const name in regedComponents) {
		const component = regedComponents[name]
		// 重新注册组件
		wrapComponent({
			name: name,
			confing: component,
			checker: checkAtuhFn,
			regToGlobal: true
		})
	}
}

// eslint-disable-next-line prettier/prettier
const wrapComponent = function(conf) {
	if (!conf.confing) {
		conf = {
			confing: conf
		}
	}
	const name = conf.name || conf.confing.name
	if (!name) {
		console.error('vue auth plugin error: wrap函数在包裹你的组件时需要提供组件名')
		return
	}
	const component = conf.confing
	const checkAtuhFn = conf.checker || defaultCheckAuthFn
	const regToGlobal = conf.regToGlobal || false
	const rComponent = {
		functional: true,
		vueAuth: true,
		props: {
			auth: {
				default() {
					return true
				}
			}
		},
		render(h, context) {
			return checkAtuhFn(context.props.auth)
				? context.parent.$createElement(component, context.data, context.children)
				: null
		}
	}
	regToGlobal && Vue.component(name, rComponent)
	return rComponent
}

const defaultCheckAuthFn = function(...argus) {
	return optionsRecord.checker ? optionsRecord.checker(...argus) : true
}

const regDirective = function(Vue, checkAtuhFn) {
	Vue.directive('auth', function(el, binding, vnode) {
		if (!checkAtuhFn(binding.value)) {
			el.className += el.className.indexOf('vue-auth') === -1 ? ' vue-auth' : ''
			el.dataset.auth = binding.value
			el.parentNode && el.parentNode.removeChild(el)
		}
		// else {
		//   el.className = el.className.replace(' vue-auth', '')
		// }
	})
}

const regMinix = function(Vue) {
	Vue.mixin({
		beforeCreate() {
			const components = this.$options.components
			for (const name in components) {
				const component = components[name]
				if (!Object.prototype.hasOwnProperty.call(components, name) || component.vueAuth) {
					continue
				}
				this.$options.components[name] = wrapComponent({ name, confing: component })
			}
		}
	})
}

const insertStyleSheet = function() {
	// 创建样式表
	const style = document.createElement('style')
	// 插入样式
	document.getElementsByTagName('head')[0].appendChild(style)
	style.sheet.insertRule('.vue-auth { display: none}', 0)
}

insertStyleSheet()

export { wrapComponent as wrap, regDirective }
export default install
