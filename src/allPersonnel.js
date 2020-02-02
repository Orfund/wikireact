import React, {Component} from "react"
import add_icon from "./add_icon.svg"
import "./personnel.css"

let PersonBriefly = (props)=>(
    <div className="persBriefly" onClick={ ()=> {props.person(props.uid)}} key={props.uid}>
        <img src={props.persAvatar}/>
        <div className="persInfo">
            <div>{props.persName}</div>
            <div className="personDesc">{props.persStatus}</div>
        </div>
    </div>
);


class AllPersonnel extends Component{
    constructor(props) {
        super(props);
        this.state= {personnel: [], query:""};
    }
    componentDidMount() {
        let xhr = new XMLHttpRequest();
        let comp = this;
        xhr.open("GET", "/allPersons");
        xhr.onload = ()=>{
            console.log(xhr.responseText);
            comp.setState({
                ...comp.state,
                personnel: JSON.parse(xhr.responseText)
            })
        };
        xhr.send()

    }
    filter = ()=>{
        this.setState({
            ...this.state,
            query:document.getElementById("searchPerson").value
        })
    };
    render(){
       return (<div style={{flex:"1 0 auto"}}>
            <div className="persHDR">
                <div>Все преподаватели</div>
                <input id = "searchPerson" type="text" placeholder='Поиск' onInput={this.filter}/>
            </div>
               <div className="personList">
                   {this.state.personnel.map( entry=>(
                       JSON.stringify(entry).includes(this.state.query) && <PersonBriefly {...{...entry, person: this.props.checker}}/>
                   ) )}
               </div>
            <img src={add_icon} onClick={this.props.addPerson}  />
        </div>
    )}
}

export default AllPersonnel
