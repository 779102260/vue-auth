import wrapComponent from './wrapComponent'

const regMinix = function(Vue, checker) {
	Vue.mixin({
		beforeCreate() {
			const components = this.$options.components
			// eslint-disable-next-line guard-for-in
			for (const name in components) {
				const component = components[name]
				if (!Object.prototype.hasOwnProperty.call(components, name) || component.vueAuth) {
					continue
				}
				this.$options.components[name] = wrapComponent(Vue, { name, config: component, checker })
			}
		}
	})
}

export default regMinix
