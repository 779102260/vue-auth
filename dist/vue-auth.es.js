!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.util=t():e.util=t()}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=function(){const e=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(e),e.sheet.insertRule(".vue-auth { display: none}",0)};var r=function(e,t){e.directive("auth",(function(e,n,o){t(n.value)||(e.className+=-1===e.className.indexOf("vue-auth")?" vue-auth":"",e.dataset.auth=n.value,e.parentNode&&e.parentNode.removeChild(e))}))};const u=function(){return!0};var c=function(e,t){console.log(t),t.config||(t={config:t});const{name:n=t.config.name,config:o,checker:r=u,regToGlobal:c=!1}=t;if(!n)return void console.error("vue auth plugin error: wrap函数在包裹你的组件时需要提供组件名");const i={functional:!0,vueAuth:!0,props:{auth:{default:()=>!0}},render:(e,t)=>r(t.props.auth)?t.parent.$createElement(o,t.data,t.children):null};return c&&e.component(n,i),i};var i=function(e,t){e.mixin({beforeCreate(){const n=this.$options.components;for(const o in n){const r=n[o];Object.prototype.hasOwnProperty.call(n,o)&&!r.vueAuth&&(this.$options.components[o]=c(e,{name:o,config:r,checker:t}))}}})};n.d(t,"wrap",(function(){return c})),n.d(t,"regDirective",(function(){return r}));const a=function(e,t){const n=e.options.components;for(const o in n){const r=n[o];c(e,{name:o,config:r,checker:t,regToGlobal:!0})}};t.default=function(e,t){if(!t)return;o(),"function"==typeof t&&(t={checker:t});const{globalComponets:n=!0,directive:u=!0,checker:f}=t;n&&a(e,f),i(e,f),u&&r(e,f),e.prototype.wrap=c}}])}));