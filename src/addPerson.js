import React from "react"
import {TextDSLEditor} from "./mmDSLtoComponent"

function uploadPendingData(){
    let fileInput = document.getElementById("avatar");
    let nameInput = document.getElementById("name");
    let statusInput = document.getElementById("status");
    let textInp = document.getElementById("textinp");

    let fdata = new FormData(document.getElementById("inp"));

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/newReview");
    xhr.send(fdata)

}


let PersonEditor = (props)=>(<div className="add-wrapper">
    Добавление преподавателя
    <form id="inp">
        <input type="file" accept="image/*" id="avatar" name="ava"/>
        <input type="text" placeholder="Имя" id="name" name="name"/>
        <input type="text" placeholder="статус" id = "status" name="status"/>
        <textarea id="textinp"></textarea>
    </form>

    <div onClick={()=>{uploadPendingData(); props.collapse()}}>
        Submit
    </div>
</div>);

export default PersonEditor;
