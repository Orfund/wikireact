import React, {Component} from 'react';
import prof from "./prof.svg"
import './App.css';
import Menu from "./menu";
import AllPersonnel from "./allPersonnel";
import PersonEditor from "./addPerson";
import AdminPanel from "./AdminPanel"
import PersonFocus from "./PersonFocus";
import IndexPage from "./IndexPage"

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
        this.state = {
            screen:Screen.default,
            vkInitialized: false,
            vkInfo : {},
            isAdmin: false
        };
        this.triggerVK = this.triggerVK.bind(this)

    }
    triggerVK(prevProps, prevState, snapshot){

        let app = this;
        if(!this.state.vkInitialized){
            /*
            * firstly try to retrieve from localstorage
            * */



            document.VK.init({apiId: 7303225});
            document.VK.Widgets.Auth("vk_auth", {"onAuth":function(data) {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", `/checkHash?user_id=${data.uid}&hash=${data.hash}`);
                    xhr.onload = ()=>{
                        console.log(xhr.responseText);
                        if(xhr.responseText === "true"){
                            let pic =   document.getElementById("trigger-profile");
                            pic.src = data.photo;
                            pic.style.border = "2px solid black";
                            localStorage.setItem("vk", JSON.stringify(data));
                            app.setState({
                                ...app.state,
                                vkInfo: data
                            });
                            pic.style.display = "flex";
                        }
                        document.getElementById("vk_auth").style.display = "none";
                    };
                    xhr.send();
                    let authreq = new XMLHttpRequest();
                    authreq.open("GET", `/isAdmin?user_id=${app.state.vkInfo.uid}&hash=${app.state.vkInfo.hash}`);
                    authreq.onload = ()=>{
                        if(xhr.responseText === "true"){
                            localStorage.setItem("is-admin", "true");
                            app.setState({
                                ...app.state,
                                isAdmin: true
                            })
                        }
                    };
                    authreq.send()
                }});
        }


        app.setState({
            ...app.state,
            vkInitialized: true
        });


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
                    <Menu personnel={this.triggerPersonnelState} admin={this.triggerAdmin} isAdmin={this.state.isAdmin} default={this.home}/>
                    <div className="title" onClick={this.home} >ВикиМехмат</div>
                    <div className="navigation-block" onClick={this.triggerCourses}>Курсы</div>
                    <div className="navigation-block" onClick={this.triggerPersonnelState}>Преподы</div>
                    <div className="profile-container" onMouseOver={
                        ()=>{
                            let prof_pic = document.getElementById("trigger-profile");
                            let vk_widget = document.getElementById("vk_auth");
                            if(!this.state.vkInitialized){
                                prof_pic.classList.add('toggle-profile');
                                let vkData = JSON.parse(localStorage.getItem("vk") || '\"\"');

                                if(vkData !== ''){
                                    prof_pic.classList.remove("toggle-profile");
                                    this.setState({
                                        ...this.state,
                                        vkInfo: vkData,
                                        initialized: true,
                                        isAdmin: Boolean(localStorage.getItem("is-admin"))
                                    });
                                    let pic = document.getElementById("trigger-profile");
                                    pic.src = vkData.photo;
                                    pic.style.border = "2px solid black";
                                    pic.style.display = "flex";
                                    return;
                                }
                                setTimeout(()=>{
                                    prof_pic.classList.remove("toggle-profile");
                                    prof_pic.style.display = "none";

                                    this.triggerVK();
                                    vk_widget.style.display = this.state.vkInitialized ? "flex" : "none";
                                },500);

                            }

                        }
                    } >
                        <img id="trigger-profile" src={prof}/>
                        <div id="vk_auth" style={{display: "none"}}></div>
                    </div>


                </div>
                <div className="mainwrapper">



                    {this.state.screen === Screen.default && <div>
                        <IndexPage/>
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
    };

    triggerCourses=()=> {
        this.setState({
            ...this.state,
            screen: Screen.default
        })
    }
}

export default App;
