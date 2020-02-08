import React, {Component} from "react";
import {Comment} from "./Comment";
import get from "./gethttp"

class PersonFocus extends Component{
    constructor(props){
        super(props);
        this.state = {};
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/person?uid="+this.props.uid);
        xhr.onload = ()=>{
          this.setState({
              ...this.state,
              ...JSON.parse(xhr.responseText)
          })
        };
        xhr.send();
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
            </div>
            <div className="pers-desc" dangerouslySetInnerHTML={{__html:this.state.text}}></div>
            <Comment comments={this.state.comments || []} id={this.state.uid} update={this.updateComments}/>
        </div>)
    }
}

export default PersonFocus;
