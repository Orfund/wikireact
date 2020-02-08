import React, {Component} from "react"
import {TextDSLEditor} from "./mmDSLtoComponent"
import setupEditor from "./Editor";
import Editor from "./editor.css"

function uploadPendingData(){
    let fileInput = document.getElementById("avatar");
    let nameInput = document.getElementById("name");
    let statusInput = document.getElementById("status");
    let textInp = document.getElementById("text-editor");

    let fdata = new FormData(document.getElementById("inp"));
    fdata.append("text", textInp.innerHTML);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/newReview");
    xhr.send(fdata)

}


class PersonEditor extends Component {
    componentDidMount() {
        setupEditor();
        console.log("selection fired");
    }

    render() {
        return (<div className="add-wrapper">
            Добавление преподавателя
            <form id="inp">
                <input type="file" accept="image/*" id="avatar" name="ava"/>
                <input type="text" placeholder="Имя" id="name" name="name"/>
                <input type="text" placeholder="статус" id="status" name="status"/>
                <div className="toolbar">
                    <div id="boldify-text" style={{fontWeight:"bold"}}>B</div>
                    <div id="quotify" >Quote</div>
                </div>
                <div id="text-editor" contentEditable={"true"}>Напишите описание</div>

            </form>

            <div onClick={() => {
                uploadPendingData();
                this.props.collapse()
            }}>
                Submit
            </div>
        </div>);
    }
}

export default PersonEditor;
