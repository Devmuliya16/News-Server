//api zqldtSxZp7XqCNBViiqvCVGsLWio0WLO
const api ="zqldtSxZp7XqCNBViiqvCVGsLWio0WLO";
const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api}`;
const tick = '<i class="fa-solid fa-check"></i>';
const trend = '<i class="fa-solid fa-arrow-trend-up"></i>';
const err = '<i class="fa-solid fa-triangle-exclamation"></i>';
const wrong = '<i class="fa-solid fa-xmark"></i>';
const search = '<i class="fa-solid fa-magnifying-glass"></i>';

//for creating the element and uppending it
//common for all
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
//for about tags common for all
function setheader(topic,count,fontawsome){
    let tagcontainer = document.createElement('span');
    tagcontainer.id='header';
    tagcontainer.style.display='block';
    tagcontainer.innerHTML=`<span> ${topic} ${fontawsome[0]} </span>
                            <span> showing results: ${count} ${fontawsome[1]}</span>`;
    document.getElementsByClassName('container')[0].appendChild(tagcontainer);
}






//fetch for home
fetch(url)
.then((responce) => responce.json())
.then((data)=>{
    //send the data to the show function
    showdata(data);
    hidespinner();
});
//looping and appending for home
function showdata(data){
    let newsArr = data.results;
    if(newsArr.length!=0){  

        let arr = [trend,tick];
        setheader('News in trend',newsArr.length,arr);

        for(obj of newsArr){
            let image='image';
            if(obj.multimedia.length!=0)
                image=obj.multimedia[1].url;
            
            createUppend(obj.section,obj.title,obj.abstract,obj.multimedia[1].url,obj.published_date);
        }
    }
    else{
        let arr=[err,wrong];
        setheader('Error: try again after some time ',newsArr.length,arr);
    }
}




//fetch for countries
function country(countryName){
    let url2= `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${countryName}&api-key=${api}`;
    fetch(url2)
    .then(responce => responce.json())
    .then((data)=>{
        //send the data to the show function
        showdataSearch(data,countryName);
    });
}



//fetch for searching
let findbtn = document.getElementById('searchbtn');
findbtn.addEventListener('click',()=>{
    let searchContent = document.getElementById('searchinput').value;
    let url3 = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchContent}&api-key=${api}`;

    fetch(url3)
    .then(responce=> responce.json())
    .then((data)=>{
        showdataSearch(data,searchContent);
    });
})

//looping and uppending for search and country
function showdataSearch(data,name){
    let searchNewsarr=data.response.docs;
    document.getElementsByClassName('container')[0].innerHTML='';

    if(searchNewsarr.length!=0){

        let arr=[search,tick];
        setheader(name,searchNewsarr.length,arr);

        for(element of searchNewsarr){
            let image = 'image';
            if(element.multimedia.length!=0)
                image=`http://www.nytimes.com/${element.multimedia[0].url}`;

            createUppend(element.keywords[0].value,element.headline.main,element.lead_paragraph,`${image}`,element.pub_date);
        }
    }
    else{
        let arr=[err,wrong];
        setheader('Error: try again after some time ',searchNewsarr.length,arr);
    }
}


// ********************************************************************************
//scroll up button
window.onscroll = ()=>{
    if(document.documentElement.scrollTop > 200)
        document.getElementsByClassName('upbtndiv')[0].style.display='block';
    else
        document.getElementsByClassName('upbtndiv')[0].style.display='none';
}

function getscrollup(){
        document.documentElement.scrollTop=0;
}


//*************************************************************************
//for spinner
