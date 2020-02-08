import React, {Component} from "react"
import {TextDSLEditor} from "./mmDSLtoComponent"
import setupEditor from "./Editor";
import Editor from "./editor.css"
import prof from "./prof.svg"

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
    constructor(props){
        super(props);
        this.state = {img: null};
        this.onFileUpload = this.onFileUpload.bind(this);
    }
    componentDidMount() {
        setupEditor();
        console.log("selection fired");

    }
    onFileUpload(e){
        let reader = new FileReader();

        reader.onload = (e)=> {
            this.setState({
                ...this.state,
                img: e.target.result
            })
        };

        reader.readAsDataURL(document.getElementById("avatar").files[0]);

    }
    render() {
        return (<div className="add-wrapper">
            Добавление преподавателя
            <form id="inp">
                <img src={this.state.img || prof} style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "2rem",
                    objectFit: "cover"
                }}/>
                <input type="file" accept="image/*" id="avatar" name="ava" onChange={this.onFileUpload}/>
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
