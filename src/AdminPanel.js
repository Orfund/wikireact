import React, {Component} from "react";

let PendingReview = (props)=>(
    <div className="adm-wrapper">

        <div className="pers-wrapper">
            <div className="persHDR" style={{flex:"0 0 auto"}}>
                <img src={props.persAvatar}/>
                <div className="persInfo">
                    <div>{props.persName}</div>
                    <div className="personDesc">{props.persStatus}</div>
                </div>
            </div>
            <div className="pers-desc"dangerouslySetInnerHTML={{__html:props.text}}></div>

        </div>
        <div className="action-container">
            <div style={{color:"red"}} onClick={()=>{
                let data = JSON.parse(localStorage.getItem("vk"));
                let xhr = new XMLHttpRequest();
                xhr.open("GET", `/approveReview?user_id=${data.uid}&hash=${data.hash}&id=${props._id}&approve=false`);
                xhr.send();
                props.hideElem(props._id);
                alert("Declined successfully");
            }}>Decline</div>
            <div style={{color:"green"}} onClick={()=>{
                let data = JSON.parse(localStorage.getItem("vk"));
                let xhr = new XMLHttpRequest();
                xhr.open("GET", `/approveReview?user_id=${data.uid}&hash=${data.hash}&id=${props._id}&approve=true`);
                xhr.send();
                props.hideElem(props._id);
                alert("Accepted successfully");
            }}>Accept</div>
        </div>
    </div>
);


class AdminPanel extends  Component{
    constructor(props){
        super(props);
        this.state = {pending:[]};

        /*xhr.open("GET", `/getPending?user_id=${document.user_info.uid}&hash=${document.user_info.hash}`);
        xhr.onload = ()=>{
            console.log(xhr.responseText);
            this.setState({
                ...this.state,
                pending: JSON.parse(xhr.responseText)
            })
        };
        xhr.send();*/
    }
    removeElement = (id)=>{
        this.setState({
            ...this.state,
            pending: this.state.pending.filter((e)=>{return e._id!==id})
        })
    };
    render() {
        return(
            <div className="review-cont">
                <div>Pending Reviews</div>
                {this.state.pending.map((info)=>(<PendingReview {...{...info, hideElem:this.removeElement}}/>))}
            </div>
        )
    }
}

export default AdminPanel;
