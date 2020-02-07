import React, {Component} from "react"
import ReactDOM from "react-dom"
import AllPersonnel from "./allPersonnel";


class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {isAdmin: null};
    }



    render() {
        return (
            <div className="menu" onMouseOver={()=>{
                if(this.state.isAdmin === null){
                    document.is_admin().then(result=>{
                        this.setState({
                            ...this.state,
                            isAdmin: result
                        })
                    })
                }
            }}>
                <div className="menuitem">
                    Кафедры
                </div>
                <div className="menuitem">
                    Курсы
                </div>
                <div className="menuitem" onClick={this.props.personnel}>
                    Преподаватели
                </div>
                {this.state.isAdmin && <div className="menuitem" onClick={this.props.admin}>
                    admin panel
                </div>}

            </div>
        );
    }
}

export default Menu;
