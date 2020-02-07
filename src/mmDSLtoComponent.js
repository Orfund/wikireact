import React, {Component} from "react";
import add_icon from "./add_icon.svg";

/*
* The underlying idea is quite simple:
* we need: easy constructed maybe limited in possibilities
* end user must be able to add components one to another just like puzzle
* therefore we will try to use json for those goals
* root element is an array of pairs: type-elem, type-elem
* it must be an array as the order is very important
* reader wont read mixed text, I think
* short example:
* */
let a = [ {type: "header", content: "some header"},
    {type: "quote", content: [
            {type: "text", content: "as i said"},
            {type: "semiheader", content: "i will show"},
            {type: "link", content: "ya all", src: "vk.com"}
        ]
    }];
/*
* So. top level is document-element. It doesn't have any special style or anything so can be easily declared as an array of elements
* atomic of document is text it is rendered into plain <span> object or maybe <div>
* as it can be seen container-like object e.g. header can hold content in two forms: either text or array of elements
* each container decides by itself how the array will be organised
* */

/*Before we go into the rabbit hole of rendering, lets think about types.
* we wish to have:
*  - header (inline) (cannot be inlined self)   } those can have only text as content
*  - semi-header (inline)                       }
*  - italics (inline) (can be inlined self)     }
*  - underline (inline) (can be inlined self)   }
*  - deleted (inline)                           }
*  - plain text                                 }
*  - hyperlink (inline) (is to be inlined self) }
*
*  - quote (inline) (cannot be inlined self)    } text and links
*  - image (why not, but adding is not so simple though)
*  - marked lists (blocked) (cannot be inlined)                                                     } anything
*  - enumerated lists (blocked) (cannot be inlined)                                                 }
*  - composition (well, just a bunch of elements one under another, it is the root type) (blocked)  }
*
*
* here we see that numerous of types demand inline components so for others just wrap them into divs
* */

/*Server-side building notes:
* assume that we have received the json. firstly,
* lets declare a component class that will render into html code or react, doesnt matter
* it will have a render method that produces some jsx react
* */

class DSLComponent extends Component{
    constructor(json){
        super(json);



        /*
        * here we will build a tree of children
        * rules how to process them depend on type so lets just save that
        * */


    }

    render(){
        switch (this.props.type) {
            case "text":
                return (<span>{this.props.value}</span>);
            case "header":
                return (<div className="dsl-header">{this.props.value}</div>);
            case "semi-header":
                return (<div className="dsl-semi">{this.props.value}</div>);
            case "italics":
                return (<span className="dsl-italics">{this.props.value}</span>);
            case "underscored":
                return (<span className="dsl-underscored">{this.props.value}</span>);
            case "deleted":
                return (<span className="dsl-deleted">{this.props.value}</span>);
            case "hyperlink":
                return(<a href={this.props.src}>{this.props.value}</a>);
            case "quote":
                return(<div className="dsl-quote">{
                    this.props.value || this.props.children.map(e=>(<DSLComponent {...e}/>))
                }</div>);
            case "composition":
                return (<div className="dsl-compose">{this.props.children.map(e=>(
                    <div><DSLComponent {...e}/></div>
                    ))}</div>);
                //TODO: Lists
            default:
                console.log(this.props.type);
                throw this.props.type;
        }
    }

}

/*lets think about how to achieve this all
* we are to have a plus button and dozen of inputs-textareas for editing content
* lets spoil the life to writers giving format:
*   header "header text"
*   list{
*       "text, text, text, text " italic "it text"
*   }
*
*   formal grammatics:
*
*   exp ::= <keyword> "<text>" || "text"
*   term ::= <keyword> {
*       [<term> || <exp>]
*    }
*
*
*
*
*
*
* */

function jsonifyDSL(text){
    return text.split("\n").map( line => {
        let lexems = line.split(" ");
        var ind = 0;

        return {type: "text", value: line};

    })
}



export class TextDSLEditor extends Component{
    constructor(props){
        super(props);
        this.state = {type:"composition", children:[]};
    }

    handleChange =(textInp)=>{
        this.setState({
            ...this.state,
            children: jsonifyDSL(document.getElementById("dsl-editor").value)
        })
    };
    render() {
        return(<div style={{
                display:"flex",
                flexDirection: "row"
            }}>
                <textarea id="dsl-editor" onInput={this.handleChange}></textarea>
                <DSLComponent {...this.state}/>

            </div>

        )
    }

}


