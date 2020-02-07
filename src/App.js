import React, {Component} from 'react';
import prof from "./prof.svg"
import './App.css';
import Menu from "./menu";
import AllPersonnel from "./allPersonnel";
import PersonEditor from "./addPerson";
import AdminPanel from "./AdminPanel"
import PersonFocus from "./PersonFocus";

const Screen = {
    default:0,
    personnel:1,
    addPerson:2,
    personView:3,
    adminView:4

};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {screen:Screen.default};
    }

    triggerAdmin = ()=>{
        this.setState({
            ...this.state,
            screen: Screen.adminView
        })
    };

    render() {
        return (
            <div className="allwrapper">
                <div className="titlewrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                    </svg>
                    <Menu personnel={this.triggerPersonnelState} admin={this.triggerAdmin}/>
                    <div className="titletext" onClick={this.home} >Mechmath wiki</div>
                    <div className="profile-container" onMouseOver={
                        ()=>{
                            let prof_pic = document.getElementById("trigger-profile");
                            let vk_widget = document.getElementById("vk_auth");
                            if(prof_pic.getAttribute("inited") !== "true"){
                                prof_pic.classList.add('toggle-profile');
                                setTimeout(()=>{
                                    prof_pic.classList.remove("toggle-profile");
                                    prof_pic.style.display = "none";
                                    vk_widget.style.display = "flex";
                                    document.init_vk();
                                },500);
                                vk_widget.onmouseleave = ()=>{
                                    prof_pic.style.display = "flex";
                                    vk_widget.style.display = "none";
                                };
                            }

                        }
                    } >
                        <img id="trigger-profile" src={prof}/>
                        <div id="vk_auth" style={{display: "none"}}></div>
                    </div>


                </div>
                <div className="mainwrapper">



                    {this.state.screen === Screen.default && <div>
                        Welcome to mechmath wiki
                    </div>}
                    {this.state.screen === Screen.personnel && <AllPersonnel addPerson={this.triggerAddPerson} checker={this.triggerPersonView}/>}
                    {this.state.screen === Screen.addPerson && <PersonEditor collapse={this.triggerPersonnelState}/>}
                    {this.state.screen === Screen.personView && <PersonFocus uid={this.state.uid}/>}
                    {this.state.screen === Screen.adminView && <AdminPanel/>}
                </div>
            </div>
        );
    }
    home = ()=>{
        this.setState({
            ...this.state,
           screen: Screen.default
        })
    };
    triggerPersonView = (uid)=>{
        this.setState({
            ...this.state,
            screen: Screen.personView,
            uid: uid
        })
    };
    triggerPersonnelState = ()=>{
        this.setState({
            ...this.state,
            screen: Screen.personnel
        })
    };
    triggerAddPerson = ()=>{
        this.setState({
            ...this.state,
            screen: Screen.addPerson
        })
    }
}

export default App;
