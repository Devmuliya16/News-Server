//api zqldtSxZp7XqCNBViiqvCVGsLWio0WLO
const api ="zqldtSxZp7XqCNBViiqvCVGsLWio0WLO";
const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api}`;


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

