const api =  process.env.NEWS_API;
const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api}`;



// fontawsome
const tick = '<i class="fa-solid fa-check"></i>';
const trend = '<i class="fa-solid fa-arrow-trend-up"></i>';
const err = '<i class="fa-solid fa-triangle-exclamation"></i>';
const wrong = '<i class="fa-solid fa-xmark"></i>';
const search = '<i class="fa-solid fa-magnifying-glass"></i>';

//for creating the element and uppending it
//common for all
function createUppend(id,topic,title,abstract,news,img,time){
    let element = document.createElement('div');
    element.className='element';
    element.id=`${id}`;
    element.innerHTML=`
    <img src='${img}' alt='image'>
    <div class='text'>
    <div class="topic">Topic: ${topic}</div>
            <h3 class="headline">${title}</h3>        
            <h4>${news}</h4>
            <div class="topic">${abstract}</div>
            <br>
            <div class="footer">
                <span><b>time:</b> ${time}</span>
                <span onclick="nativeShare(${id})"><i class="fa-solid fa-share-nodes"></i></span>
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
});
//looping and appending for home
function showdata(data){
    let newsArr = data.results;
    if(newsArr.length!=0){  

        let arr = [trend,tick];
        setheader('News in trend',newsArr.length,arr);

        let topic,head,abstract,image,date;
        for(let [index,obj] of newsArr.entries()){
            topic = (obj.section =='') ? 'topic' : obj.section;
            head = (obj.title =='') ? 'title' : obj.title;
            abstract = (obj.abstract =='') ? 'abstract' : obj.abstract;
            image = (obj.multimedia == null) ? 'image' : obj.multimedia[1].url;
            date = (obj.published_date == '') ? '2022' : obj.published_date;

                createUppend(index,topic,head,abstract,``,`${image}`,date);
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
        setheader(`results for: ${name}`,searchNewsarr.length,arr);

        let topic,head,content,image,time,abstract;
        for(let [index,element] of searchNewsarr.entries()){
            topic = (element.keywords.length==0) ? 'topic' :  element.keywords[0].value;
            head =  (element.headline.main==null) ? 'head' : element.headline.main;
            abstract = (element.abstract == '') ? 'abstract' : element.abstract; 
            content = (element.lead_paragraph=='') ? 'content' : element.lead_paragraph;
            image = (element.multimedia.length == 0) ? 'image' : `http://www.nytimes.com/${element.multimedia[0].url}`;
            time = (element.pub_date ==null) ? '2022' : element.pub_date;

            createUppend(index,topic,head,abstract,content,`${image}`,time);
        }
    }
    else{
        let arr=[err,wrong];
        setheader('Error: try again after some time ',searchNewsarr.length,arr);
    }
}


// ********************************************************************************
//scroll up button
let progressBar = document.getElementsByClassName('progress-bar')[0];
window.onscroll = ()=>{
    if(document.documentElement.scrollTop > 200)
        document.getElementsByClassName('upbtndiv')[0].style.display='block';
    else
    document.getElementsByClassName('upbtndiv')[0].style.display='none';
    
    
    //*********************************************************************************
    // progress bar
    let getheight = document.documentElement.scrollTop;
    let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width=`${(getheight/totalHeight)*100}%`;
}

function getscrollup(){
        document.documentElement.scrollTop=0;
    }

    
    

//********************************************************************************
//slidebar for sharing
function toggleside(){
    let sidebarlink =   document.getElementsByClassName('sidebarlink')[0];
    (sidebarlink.style.display=='none') ? sidebarlink.style.display='block' : sidebarlink.style.display='none';

}



//********************************************************************************
//share on native dialogue

function nativeShare(id){
    let elem = document.getElementById(`${id}`);
        let data = {
          url: window.location.href,
          text: elem.children[1].children[3].innerHTML + elem.children[1].children[1].innerHTML,
          title: "NEWS SERVER ONLINE",
        }
        try{
          navigator.share(data);
          console.log('opened nevigator');
        }
        catch(err){
            console.log('navigator is not supported in the device');
        }
}
