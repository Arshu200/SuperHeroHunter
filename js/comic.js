//get character id from url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//marvel api urls
const comicURL = `${marvelURL}comics/${id}?${marvelURLHeader}`
const charactersURL = `${marvelURL}comics/${id}/characters?${marvelURLHeader}`

const title = document.getElementsByTagName('title')[0];
const characterDescription = document.getElementById('character-description');
const characterComics = document.querySelector('#character-comics');

//redirect to different pages
let redirect = (type)=>{
    window.location.href = `./${type[0]}.html?id=${type[1]}`;
}

//check if the comic is marked favourite
const checkFav = (id)=>{
    let charArray = JSON.parse(localStorage.getItem('favComic'));
    console.log(id)
    if(charArray.indexOf(id.toString())!=-1){
        document.querySelector('.char-fav-btn').innerHTML='Remove Favourite';
    }
}

//toggle favourite
const toggle = (id) =>{
    let charArray = JSON.parse(localStorage.getItem('favComic'));
    let idx =charArray.indexOf(id.toString());
    if(idx==-1){
        document.querySelector('.char-fav-btn').innerHTML='Remove Favourite';
        //add to favourite
        charArray.push(id.toString());
        localStorage.setItem('favComic',JSON.stringify(charArray));
    }
    else{
        document.querySelector('.char-fav-btn').innerHTML='Add Favourite';
        //if favourite remove from localstorage and unmark
        charArray.splice(idx,1);
        localStorage.setItem('favComic',JSON.stringify(charArray));
    }
}

//display comics fetched from api
const displayComic = (comic)=>{
    console.log(comic)
    title.innerHTML = comic.title;
    let description = `
                    <div class="character-desc-card d-flex mb-5">
                        <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}">
                        <div>                    
                            <h3> ${comic.title} </h3>
                            <p>${comic.description}</p>
                        </div>
                        <div class="char-desc-fav">
                            <button class="char-fav-btn" onclick="toggle(${comic.id})"> Add Favourite</button>
                        </div>
                    </div>`;
    characterDescription.innerHTML = description;
    checkFav(comic.id);
} 

//display character fetched from api
const displayCharacter = (character)=>{
    let characterComic = `
            <div class = "character-card" id = "character-${character.id}">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}">
                <p class = "card-name">${character.name}</p>
                <div id = "favChar-${character.id}" class="favourite-btn">
                    <i class="fa-solid fa-star"></i>
                 </i></div>
            </div>`
    characterComics.innerHTML+=characterComic;
    isFavourite('favChar',character.id);
}

//fetch comic details
getdata(comicURL).then((data)=>displayComic(data[0]));
//fetch characters related to the comic
getdata(charactersURL).then((data)=>data.map(displayCharacter));
