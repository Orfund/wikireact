function urlParams(obj){
    return Object.keys(obj).map( (name, value)=>(
            `${name}=${value}`
        )
     ).reduce( (acc, val)=>(`${acc}&${val}`) , "")
}

function get(path, params, callback){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/${path}?${urlParams(params)}`);
    xhr.onload = ()=>{
        callback(xhr.responseText);
    };
    xhr.send();
}

export default get;
