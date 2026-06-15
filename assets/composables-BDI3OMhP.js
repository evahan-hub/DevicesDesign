import{g as e,e as u,s as n}from"./ResizeObserver.es-WWb1bdFA.js";/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */function s(){return e().proxy.$root.$router}function c(){var r=e().proxy.$root;if(!r._$route){var t=u(!0).run(function(){return n(Object.assign({},r.$router.currentRoute))});r._$route=t,r.$router.afterEach(function(o){Object.assign(t,o)})}return r._$route}export{c as a,s as u};
