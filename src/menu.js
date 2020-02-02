import React from "react"
import ReactDOM from "react-dom"
import AllPersonnel from "./allPersonnel";


let Menu = (props)=>(
    <div className="menu">
        <div className="menuitem" >
            Кафедры
        </div>
        <div className="menuitem">
            Курсы
        </div>
        <div className="menuitem" onClick={ props.personnel }>
            Преподаватели
        </div>

    </div>
);

export default Menu;
