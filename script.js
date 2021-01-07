// vscode://vscode.github-authentication/did-authenticate?windowid=3&code=27aa06dc048a14b6e606&state=32647aad-4ac8-441f-80c7-45d184f7ba7f
const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const quoteTwitter = document.getElementById("twitter");
const quoteNew = document.getElementById("new-quote");
const loader = document.getElementById("loader");
async function getQuote(){
    loading();
    const proxyUrl = "https://pacific-wave-83578.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        if(data.quoteAuthor===""){
            author.innerText="Unknown";
        }else{
            author.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length>120){
            quote.classList.add("long-text");
        }else{
            quote.classList.remove("long-text");
        }
        quote.innerText = data.quoteText;
    }catch(err){
        getQuote();
        console.log("Whoop! no quote!", err);
    }
    complete();
}
function twittQuote(){
    const newAuthor = author.innerText;
    const newQuote = quote.innerText;
    const twittUrl = `https://twitter.com/intent/tweet?text=${newQuote} - ${newAuthor}`;
    window.open(twittUrl, "_blank");
}
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}
quoteTwitter.addEventListener("click",twittQuote);
quoteNew.addEventListener("click",getQuote);
getQuote();
