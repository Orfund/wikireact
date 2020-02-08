



export default function setupEditor(){
    var cachedRange;

    let boldBtn = document.getElementById("boldify-text");
    let quotebtn = document.getElementById("quotify");


    let editor = document.getElementById("text-editor");
    quotebtn.onclick = ()=>{
        editor.innerHTML = editor.innerHTML.replace(cachedRange.toString(), `<div class="quote">“${cachedRange}”</div>`)
    };
    boldBtn.onclick = ()=>{
        editor.innerHTML = editor.innerHTML.replace(cachedRange.toString(), `<strong>${cachedRange}</strong>`)
    };
    document.onselectionchange = ()=>{
        let range = document.getSelection().getRangeAt(0);
        if(range.startContainer.parentNode === editor|| range.startContainer.parentNode.parentElement ===editor){
            cachedRange = range;
        }

    }
}
