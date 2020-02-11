import React, {Component} from "react";
import prof from "./prof.svg"
import Comments from "./Comments.css"

function SingleComment(props) {
    return (<div className="comment-wrapper">
        <div className="comment-header">
            <img src={props.img || prof}/>
            <div>{props.name || "Анонимно"}</div>
        </div>
        <div>
            {props.text}
        </div>
    </div>)
}


class AddComment extends Component {
    constructor(props){
        super(props);
        this.state = {anon:true, val:""};
    }
    toggleAnon = ()=>{
        this.setState({
            ...this.state,
            anon: !this.state.anon
        })
    };
    uploadForm = ()=>{
        return {
            anon: this.state.anon,
            text: document.getElementById("comment-input").value
        }
    };
    render() {
        let vkData =JSON.parse(localStorage.getItem("vk") || '{}');
        let name = vkData ? vkData.first_name+" "+vkData.last_name : "Анонимно";
        console.log(vkData!=={});
        return (
            <div className="comment-wrapper" style={{boxShadow:"none"}}>
                <div className="comment-header">
                    { vkData.photo ? (<div id="ava-wrap2" className={this.state.anon? "ava-wrap2-inactive": ""}>
                        <div id="img-wrapper" className={ this.state.anon? "wrapper-move": "wrapper-return"}>
                            <img id="avatar" className={this.state.anon ? "img-anon": "img-not-anon"} src={vkData.photo || prof} onClick={this.toggleAnon}/>
                        </div>
                    </div>) : (<img src={prof}/>)}



                    <div>{!this.state.anon ? name  : "Анонимно"}</div>
                </div>
                <textarea id="comment-input"></textarea>
                <div onClick={()=>{this.props.submit(this.uploadForm())}}>Отправить</div>
            </div>
        )
    }
}


export class Comment extends Component {
    submit = (formData)=>{
        let vkData =JSON.parse(localStorage.getItem("vk") || '{}');
        let xhr = new XMLHttpRequest();
        let data = `uid=${this.props.id}&text=${formData.text}`;
        if(!formData.anon){
            data+=`&img=${vkData.photo}&name=${vkData.first_name}%20${vkData.last_name}`;
            formData = {
                ...formData,
                img: vkData.photo,
                name: vkData ? vkData.first_name+" "+vkData.last_name : "Анонимно"
            };
            console.log(formData)
        }
        xhr.open("GET", "/newComment?"+data);
        xhr.send();
        this.props.update(formData);
    };
    render() {

        return (<div className="comments-block">
            <div style={{fontWeight:"bolder", padding:"1rem"}}>Комментарии</div>
            {this.props.comments.map(comment => (
                <SingleComment {...comment}/>
            ))}
            <AddComment submit={this.submit}/>
        </div>)
    }
}
