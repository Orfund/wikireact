import React, {Component} from "react"
import ReactDOM from "react-dom"
import AllPersonnel from "./allPersonnel";


let Menu = (props)=>(
    <div className="menu menu-usual">

        <div className="menuitem" onClick={props.default}>
            ВикиМехмат
        </div>
        <div className="menuitem">
            Курсы
        </div>
        <div className="menuitem" onClick={props.personnel}>
            Преподаватели
        </div>
        {props.isAdmin && <div className="menuitem" onClick={props.admin}>
            admin panel
        </div>}

    </div>
);


export default Menu;
