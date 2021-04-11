!function e(t,n,i){function r(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[s]={exports:{}};t[s][0].call(l.exports,function(e){var n=t[s][1][e];return r(n?n:e)},l,l.exports,e,t,n,i)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=e("./Components/Device"),a=i(s),u=function(){function e(t){r(this,e),this.storeNamespace="rt9000",this.url=document.querySelector("#url"),this.oldUrl="",this.factory=document.querySelector("#factory"),this.output=document.querySelector("#output"),this.devices=[],this.url&&(this.url.addEventListener("keydown",this.onUrlKeyDown.bind(this)),this.url.addEventListener("change",this.onUrlChange.bind(this))),this.factory&&this.factory.addEventListener("submit",this.onFactorySubmit.bind(this)),this.restore(),addEventListener("beforeunload",this.onUnload.bind(this))}return o(e,[{key:"onFactorySubmit",value:function(e){var t=e.currentTarget.elements,n={url:this.url.value};e.preventDefault();for(var i=0;i<t.length;i++){var r=t[i];if("width"===r.name?n.width=r.value:"height"===r.name?n.height=r.value:"label"===r.name&&(n.label=r.value),r.checked===!0){var o=JSON.parse(r.value);o.url=this.url.value,this.createDevice(o),r.checked=void 0}}n.width&&n.height&&this.createDevice(n),this.factory.classList.remove("visible")}},{key:"onUrlKeyDown",value:function(e){var t=e.which||e.keyCode||0;return 13===t?this.onUrlChange(e):void 0}},{key:"onUrlChange",value:function(e){var t=this.url.value;this.oldUrl!==t&&(this.devices.forEach(function(e){e.url=t}),localStorage.setItem(this.storeNamespace+".url",this.oldUrl=t))}},{key:"onDeviceClose",value:function(e){var t=this.devices.indexOf(e);0>t||this.devices.splice(t,1)}},{key:"onUnload",value:function(){var e=[];this.devices.forEach(function(t){e.push(t["export"]())}),localStorage.setItem(this.storeNamespace+".devices",JSON.stringify(e))}},{key:"createDevice",value:function(e){var t=this,n=new a["default"](e);n.onClose=function(e){return t.onDeviceClose(e)},this.output.appendChild(n.screen),this.devices.push(n)}},{key:"restore",value:function(){var e=this,t=JSON.parse(localStorage.getItem(this.storeNamespace+".devices"))||[];localStorage.getItem(this.storeNamespace+".url");t.forEach(function(t){return e.createDevice(t)}),this.url.value=localStorage.getItem(this.storeNamespace+".url"),this.onUrlChange()}}]),e}();new u},{"./Components/Device":2}],2:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=function(){function e(t){i(this,e),t="object"===("undefined"==typeof t?"undefined":r(t))&&t||{},this.iframe=document.createElement("iframe"),this.iframe.classList.add("iframe"),this.closeButton=document.createElement("button"),this.closeButton.addEventListener("click",this.onCloseButtonClicked.bind(this)),this.closeButton.classList.add("plain-button","close","gimme-seizure","-hardcore"),this.screen=document.createElement("div"),this.screen.classList.add("device-screen"),this.screen.appendChild(this.iframe),this.screen.appendChild(this.closeButton),this.width=parseInt(t.width||400,10),this.height=parseInt(t.height||400,10),this.url=t.url||"",this.label=t.label}return o(e,[{key:"onCloseButtonClicked",value:function(e){this.screen.parentNode.removeChild(this.screen),"function"==typeof this.onClose&&this.onClose(this)}},{key:"export",value:function(){return{width:this.width,height:this.height,label:this.label}}},{key:"url",get:function(){return this.iframe.src},set:function(e){this.iframe.src=e}},{key:"width",get:function(){return this.iframe.width},set:function(e){this.iframe.width=e,this.screen.dataset.width=e}},{key:"height",get:function(){return this.iframe.height},set:function(e){this.iframe.height=e,this.screen.dataset.height=e}},{key:"label",get:function(){return this.screen.dataset.label},set:function(e){e&&(this.screen.dataset.label=e)}}]),e}();n["default"]=s},{}]},{},[1]);