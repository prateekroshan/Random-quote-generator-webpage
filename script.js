const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const quoteButton = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter');
const loaderIcon = document.getElementById("loader")
const quoteDay = document.getElementById("quote-day")

//loading the spinner
function loader(){
    loaderIcon.hidden = false;
    quoteContainer.hidden = true;
    quoteDay.hidden = true;


}
// removing the spinner
function complete(){
    if (!loaderIcon.hidden){
        quoteContainer.hidden = false;
        loaderIcon.hidden = true;
        quoteDay.hidden=false;
    }
}


// get quote from api
async function getQuote(){
    loader();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; //we need a proxy call to make our api call
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl );
        const data = await response.json();
        // If author is blank, add "unknown" to the author field
        if (data.quoteAuthor === ''){
            authorText.innerText = "-unknown";
        }else {
            authorText.innerText = `-`+ data.quoteAuthor;
        }
        quoteText.innerText = data.quoteText;
        complete();


    }catch (error){
        getQuote();

    }
}



// send quote as tweet
function twitter (){
    const author = authorText.innerText;
    const quote = quoteText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}
// Adding Event listeners to our buttons
quoteButton.addEventListener('click',getQuote);
twitterButton.addEventListener('click',twitter);

//load quote
getQuote();
