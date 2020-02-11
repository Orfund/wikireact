import React, {Component} from "react";
import {Comment} from "./Comment";
import get from "./gethttp"
import create from "./create-24px.svg"
import upload from "./cloud_upload-24px.svg"
import setupEditor from "./Editor";

class PersonFocus extends Component{
    constructor(props){
        super(props);
        this.state = {canModeBeToggled: localStorage.getItem("is-admin"), mode:false};
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/person?uid="+this.props.uid);
        xhr.onload = ()=>{
          this.setState({
              ...this.state,
              ...JSON.parse(xhr.responseText)
          })
        };
        xhr.send();
        this.toggleMode = this.toggleMode.bind(this);
    }
    toggleMode(){
        let vkData = JSON.parse(localStorage.getItem("vk") || "{}");
        if(!this.state.mode && this.state.canModeBeToggled){
            setupEditor();
        } else {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", `/updatePerson?user_id=${vkData.uid}&hash=${vkData.hash}&uid=${this.props.uid}`);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send("text="+document.getElementById("text-editor").innerHTML);
        }
        this.setState({
            ...this.state,
            mode: this.state.canModeBeToggled && !this.state.mode
        });



    }
    updateComments = (newCommentsValue)=>{
        this.setState({
            ...this.state,
            comments: this.state.comments.concat([newCommentsValue])
        })
    };
    render(){


        return(<div className="pers-wrapper">
            <div className="persHDR" style={{flex:"0 0 auto"}}>
                <img src={this.state.persAvatar}/>
                <div className="persInfo">
                    <div>{this.state.persName}</div>
                    <div className="personDesc">{this.state.persStatus}</div>
                </div>
                <div>
                    <img src={this.state.mode ? upload :create} onClick={this.toggleMode}/>
                </div>
            </div>
            <form>
                <div className="toolbar" style={{display: this.state.mode ? "flex": "none"}}>
                    <div id="boldify-text" style={{fontWeight:"bold"}}>B</div>
                    <div id="quotify" >Quote</div>
                </div>
                <div className="pers-desc" dangerouslySetInnerHTML={{__html:this.state.text}} contentEditable={this.state.mode} id="text-editor"></div>

            </form>
           <Comment comments={this.state.comments || []} id={this.state.uid} update={this.updateComments}/>
        </div>)
    }
}

export default PersonFocus;
