import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Menu from "./menu";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

let menuIcon = document.querySelector(".titlewrapper > svg");
let menu = document.querySelector(".menu");

menuIcon.onmouseover = ()=>{
  menu.style.display = "flex"
};

menu.onclick = menu.onmouseleave = ()=>{
    menu.style.display = "none"
};

