
## 安装

```js
npm install @yangsansuan/vue-auth -S
```

## 使用

1. 引入 & 配置

```js
import Auth from '@yangsansuan/vue-auth'
Vue.use(Auth, options)
```

注：在其他组件库和包装组件库引入后再注册本插件

`options`为插件的配置项：

```js
{
  globalComponets: true, // 默认开启，给全局组件增加权限控制（包括第三方库，比如element，必须先引入库）
  directive: true, // 默认开启，给vue增加`v-auth`指令
  checker: fn // 权限的校验函数，fn必须返回一个Boolean值，false表示隐藏，fn接受一个参数（参见api）
}
```

一般来说只需要配置`checker`即可，此时直接将`options`配置为`checker`函数即可:

```js
const checkAuthFn = function(xx){
  // ...
}
Vue.use(auth, checkAuthFn)
```

2. 使用

- 组件上使用

在组件上添加`auth`属性，其值会注入`checker`函数中，如果函数返回`false`则不会渲染此组件

```html
<my-component auth="xx"></my-component>
```

- 标签上使用

在组件上添加`v-auth`指令，其值会注入`checker`函数中，如果函数返回`false`则会隐藏并删除此标签

```html
<div v-auth="xxx"></div>
```

## apis

### `options`

1. `globalComponets`

Boolean，可选，默认开启。给全局组件增加权限控制，关闭后可能全局组件无法进行权限控制

2. `directive`

Boolean，可选，默认开启。给vue增加`v-auth`指令，在非组件元素上需要使用此指令进行权限控制

3. `checker`

Function，必填。权限的校验函数，用户在此函数中判断是否有权限

此函数接受一个参数（由`auth`属性或`v-auth`指令提供），并要求返回一个`Boolean`值

### `wrap`

```js
wrap(component)
```

用来包裹一个组件，返回一个函数式组件，然后使用返回的组件代替原组件在页面使用，这样就可以使用`auth`属性进行权限控制

### `regDirective`

```js
regDirective()
```

给vue增加`v-auth`指令

## 构建

```
npm run build
```

## npm发版

1. 修改`package.json`中的`version`
2. 发布

```
npm publish
```

## 实现原理

1. 对于标签
通过自定义指令（v-auth）传入的权限字段，决定是不是隐藏并移除标签

2. 对于组件
函数式组件可以实现完全透传，实现HOC组件包裹组件，通过prop（auth）传入的权限字段决定是否渲染组件

- 对于全局组件
遍历所有的全局组件（`Vue.options.components`），使用HOC包裹后覆盖

- 对于组件内的局部组件
在`beforeCreate`生命周期遍历局部组件，使用HOC包裹后覆盖


