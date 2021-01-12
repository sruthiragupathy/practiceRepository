const quoteDiv = document.querySelector("#quote-wrapper");
const pageDiv = document.querySelector("#page-wrapper");
let pageSize = 7
var quotesArr = [];
var buttonsDiv;


function getPages(totalQuotes){
    
    const totalPages = Math.ceil(totalQuotes/pageSize);
    var name = '';
    for(let i=0;i<totalPages;i++){
        if(i!==0){
        name+=`<button class="btn" value=${i+1}>${i+1}</button>`     
        }
        else{
            name+=`<button class="btn btn-active" value=${i+1}>${i+1}</button>`
        }   
        
    }
   
    pageDiv.innerHTML=name
    
    buttonsDiv = document.querySelectorAll(".btn");

}

function pagination(arr,startIndex){
    
    var trimmedStart = startIndex*pageSize;
    var trimmedEnd = trimmedStart+pageSize;
    if(trimmedEnd>arr.length){
        trimmedEnd = arr.length;
    }
    console.log(trimmedStart,trimmedEnd);
    var temp = arr.slice(trimmedStart,trimmedEnd);
    quoteDiv.innerHTML='';
    var fragment = document.createDocumentFragment();
    temp.map(quote=>{
            var p = document.createElement("p")
            p.innerHTML =`${quote.text} - ${quote.author}`;
            fragment.appendChild(p);

        })
        quoteDiv.appendChild(fragment)
   

}

function getQuotes(){
    fetch("https://type.fit/api/quotes")
    .then(response=>
        
        response.json())
    .then(json=>{
        
        qoutesArr = json.slice(0,46);
        let totalQuotes = qoutesArr.length;
        
        pagination(qoutesArr,0)
        
        
        getPages(totalQuotes)
    })
    .catch(error=>console.log("error",error));

    
}

getQuotes();

pageDiv.addEventListener("click",function(e){
    console.log("clicked");
    toggleClass()
    e.target.classList.add("btn-active")
    
    
    pagination(qoutesArr,e.target.value-1)
})

function toggleClass(){
    buttonsDiv.forEach(btn=>{
        btn.classList.contains("btn-active")?btn.classList.remove("btn-active"):""
    })
}