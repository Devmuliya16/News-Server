//api zqldtSxZp7XqCNBViiqvCVGsLWio0WLO
const api ="zqldtSxZp7XqCNBViiqvCVGsLWio0WLO";
const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api}`;
const tick = '<i class="fa-solid fa-check"></i>';
const trend = '<i class="fa-solid fa-arrow-trend-up"></i>';
const err = '<i class="fa-solid fa-triangle-exclamation"></i>';
const wrong = '<i class="fa-solid fa-xmark"></i>';

let content;
fetch(url).then(responce => responce.json())
.then((data)=>{
    //send the data to the show function
    showdata(data);
});

//for creating the element and uppending it
function createUppend(topic,title,news,img,time){
    let element = document.createElement('div');
    element.className='element';
        element.innerHTML=`
        <img src='${img}' alt='image'>
        <div class='text'>
            <div class="topic">Topic: ${topic}</div>
            <h3 class="headline">
                ${title}
            </h3>        
            <h4>${news}</h4>
            <span class="time"><b>time:</b> ${time}</span>
        </div>
        `;

    document.getElementsByClassName('container')[0].appendChild(element);
}

function setheader(topic,count,fontawsome){
    let tagcontainer = document.getElementById('header');
    tagcontainer.style.display='block';
    tagcontainer.children[0].innerHTML+=`${topic} ${fontawsome[0]}`;
    tagcontainer.children[1].innerHTML+=`showing results: ${count} ${fontawsome[1]} `;
}





//show function
function showdata(data){
    let newsArr = data.results;
    if(newsArr!=0){  
        let arr = [trend,tick];
        setheader('News in trend',newsArr.length,arr);
        for(obj of newsArr){
            createUppend(obj.section,obj.title,obj.abstract,obj.multimedia[1].url,obj.published_date);
        }
    }
    else{
        let arr=[err,wrong];
        setheader('Error: try again after some time ',newsArr.length,arr);
    }
}

//for drop down

function country(countryName){
    let url2= `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${countryName}&api-key=${api}`;
    fetch(url2)
    .then(responce => responce.json())
    .then((data)=>{
        //send the data to the show function
    countrynews(data);
    });

}

function countrynews(data){
    let countrynewsarr=data.response.docs;
    
    document.getElementsByClassName('container')[0].innerHTML='';
    for(element of countrynewsarr){
        createUppend(element.keywords[0].value,element.headline.main,element.lead_paragraph,`http://www.nytimes.com/${element.multimedia[0].url}`,element.pub_date);
    }
}
