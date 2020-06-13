const insertStyleSheet = function() {
	// 创建样式表
	const style = document.createElement('style')
	// 插入样式
	document.getElementsByTagName('head')[0].appendChild(style)
	style.sheet.insertRule('.vue-auth { display: none}', 0)
}

export default insertStyleSheet
