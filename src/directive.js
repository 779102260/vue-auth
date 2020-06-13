const regDirective = function(Vue, checkAtuhFn) {
	// eslint-disable-next-line no-unused-vars
	Vue.directive('auth', function(el, binding, vnode) {
		if (!checkAtuhFn(binding.value)) {
			el.className += el.className.indexOf('vue-auth') === -1 ? ' vue-auth' : ''
			el.dataset.auth = binding.value
			el.parentNode && el.parentNode.removeChild(el)
		}
	})
}

export default regDirective
