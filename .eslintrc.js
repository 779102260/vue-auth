module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    extends: ['eslint:recommended', 'google', 'plugin:prettier/recommended'],
    parserOptions: {
        'parser': 'babel-eslint', // 支持babel新语法
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            process.env.NODE_ENV === 'production' ? 'off' : 'error', 
            // prettier 规则配置
            {
                'useTabs': true,
                'printWidth': 100, // 一行代码超过这个值换行
                'endOfLine': 'auto', // 换行cr检查
                'singleQuote': true, // 启动单引号
                'semi': false, // 语句结尾无分号
            }
        ],
        'no-invalid-this': 'off'
    }
};