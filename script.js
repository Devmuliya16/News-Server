//api zqldtSxZp7XqCNBViiqvCVGsLWio0WLO
const api ="zqldtSxZp7XqCNBViiqvCVGsLWio0WLO";
const url = `https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=0728bb422eda4d8ebc9ddd52fcaee104`;

let content;
fetch(url).then(responce => responce.json())
.then((data)=>{
    console.log(data);
    console.log('google');
    //send the data to the show function
    showdata(JSON.stringify(data));
});


//show function
function showdata(data){
    console.log(data);
    document.getElementsByClassName('content')[0].innerHTML=data;
}

