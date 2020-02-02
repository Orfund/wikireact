import React, {Component} from "react";

class PersonFocus extends Component{
    constructor(props){
        super(props);
        this.state = {};
        let xhr = new XMLHttpRequest();
        console.log(this.props.uid);
        xhr.open("GET", `/person?uid=${this.props.uid}`);
        xhr.onload = ()=>{
            let result = JSON.parse(xhr.responseText);
            this.setState({
                ...result,
                ...this.state
            })
        };
        xhr.send();
    }
    render(){


        return(<div className="pers-wrapper">
            <div className="persHDR" style={{flex:"0 0 auto"}}>
                <img src={this.state.persAvatar}/>
                <div className="persInfo">
                    <div>{this.state.persName}</div>
                    <div className="personDesc">{this.state.persStatus}</div>
                </div>
            </div>
            <div className="pers-desc">{this.state.text}</div>

        </div>)
    }
}

export default PersonFocus;
