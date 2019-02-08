(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{147:function(e,n,t){"use strict";t.r(n);var a=t(2),o=t.n(a),r=t(22),i=t.n(r),c=(t(69),t(30)),l=t(31),s=t(33),u=t(32),d=t(34),m=(t(71),function(e){return o.a.createElement("button",{className:"toggle-button",onClick:e.click},o.a.createElement("div",{className:"toggle-button__line"}),o.a.createElement("div",{className:"toggle-button__line"}),o.a.createElement("div",{className:"toggle-button__line"}))}),p=(t(73),function(e){return o.a.createElement("header",{className:"toolbar"},o.a.createElement("nav",{className:"toolbar__navigation"},o.a.createElement("div",{className:"toolbar__toggle-button"},o.a.createElement(m,{click:e.drawerClickHandler})),o.a.createElement("div",{className:"toolbar__logo"},o.a.createElement("a",{href:"/"},"Minhas Viagens")),o.a.createElement("div",{className:"spacer"}),o.a.createElement("div",{className:"toolbar_navigation-items"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{href:"/"},"Adicionar nova cidade"))))))}),f=(t(75),function(e){var n="side-drawer";return e.show&&(n="side-drawer open"),o.a.createElement("nav",{className:n},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{href:"/"},"Adicionar nova cidade"))))}),g=(t(77),function(e){return o.a.createElement("div",{className:"backdrop",onClick:e.click})}),h=t(23),v=t.n(h),w=t(50),k=t(24),b=t(63),E=t.n(b),C=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=Object(s.a)(this,(e=Object(u.a)(n)).call.apply(e,[this].concat(o)))).state={selectedPlace:"",activeMarker:{},showingInfoWindow:!1,cities:[]},t.onMarkerClick=function(e,n,a){t.setState({selectedPlace:e,activeMarker:n,showingInfoWindow:!0})},t.onMapClicked=function(e){t.state.showingInfoWindow&&t.setState({showingInfoWindow:!1,activeMarker:null})},t}return Object(d.a)(n,e),Object(l.a)(n,[{key:"geoCoding",value:function(){var e=Object(w.a)(v.a.mark(function e(n){return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(w.a)(v.a.mark(function e(t,a){var o;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://maps.googleapis.com/maps/api/geocode/json?address=".concat(n,"&key=AIzaSyAxt-VCR6Hc3dCH8yt6hVpQwIub-vqQBMU"));case 2:o=(o=e.sent).json(),t(o);case 5:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}()},{key:"componentWillMount",value:function(){var e=this;E.a.database().ref("/Cidades").once("value").then(function(n){var t=[];n.val().forEach(function(n){e.geoCoding(n.Nome).then(function(a){console.log(a),"OK"===a.status?t.push({name:n.Nome,lat:a.results[0].geometry.location.lat,lng:a.results[0].geometry.location.lng}):console.log(n),e.setState({cities:t})})})})}},{key:"render",value:function(){var e=this,n=[];return this.state.cities.forEach(function(t){n.push(o.a.createElement(k.Marker,{key:t.lat+t.lng+t.name,onClick:e.onMarkerClick,name:t.name,position:{lat:t.lat,lng:t.lng}}))}),o.a.createElement(k.Map,{google:this.props.google,onClick:this.onMapClicked,zoom:4.45,initialCenter:{lat:-14.5401117,lng:-45.1187843}},n,o.a.createElement(k.InfoWindow,{marker:this.state.activeMarker,visible:this.state.showingInfoWindow},o.a.createElement("div",null,o.a.createElement("h1",null,this.state.selectedPlace.name))))}}]),n}(a.Component),y=Object(k.GoogleApiWrapper)({apiKey:"AIzaSyAxt-VCR6Hc3dCH8yt6hVpQwIub-vqQBMU"})(C),O=t(1),j=t.n(O),M=function(e){function n(e){var t;Object(c.a)(this,n),(t=Object(s.a)(this,Object(u.a)(n).call(this,e))).state={sideDrawerOpen:!1},t.drawerToggleClickHandler=function(){t.setState(function(e){return{sideDrawerOpen:!e.sideDrawerOpen}})},t.backdropClickHandler=function(){t.setState({sideDrawerOpen:!1})};return j.a.initializeApp({apiKey:"AIzaSyCevUPMzUXYl9S63Zm6Wexy6CM0KSvgqp4",authDomain:"appdaana-89bcc.firebaseapp.com",databaseURL:"https://appdaana-89bcc.firebaseio.com",projectId:"appdaana-89bcc",storageBucket:"appdaana-89bcc.appspot.com",messagingSenderId:"97719053670"}),t}return Object(d.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){var e;return this.state.sideDrawerOpen&&(e=o.a.createElement(g,{click:this.backdropClickHandler})),o.a.createElement("div",{style:{height:"100%"}},o.a.createElement(p,{drawerClickHandler:this.drawerToggleClickHandler}),o.a.createElement(f,{show:this.state.sideDrawerOpen}),e,o.a.createElement("main",{style:{marginTop:"64px"}},o.a.createElement(y,null)))}}]),n}(a.Component),N=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function I(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(o.a.createElement(M,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/minhas-viagens",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/minhas-viagens","/service-worker.js");N?(function(e){fetch(e).then(function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):I(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):I(e)})}}()},64:function(e,n,t){e.exports=t(147)},69:function(e,n,t){},71:function(e,n,t){},73:function(e,n,t){},75:function(e,n,t){},77:function(e,n,t){}},[[64,2,1]]]);
//# sourceMappingURL=main.d6c67f28.chunk.js.map