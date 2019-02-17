import * as P from 'pixi.js';

document.addEventListener("DOMContentLoaded", function(event) 
{ 
  const App = new P.Application({width: window.outerWidth, height: window.outerHeight});
  document.body.appendChild(App.view);
});

