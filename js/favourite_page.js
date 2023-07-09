let characterContainer = document.querySelector('#character-container');
let comicContainer = document.querySelector('#comic-container');

let redirect = (type)=>{
    console.log('first')
    window.location.href = `./${type[0]}.html?id=${type[1]}`;
}

//display favourite characters
const displayCharacter = (character)=>{
    //fetch character details
    getdata(`${marvelURL}characters/${character}?${marvelURLHeader}`)
    .then((data)=>data[0])
    .then(character=>{
        let characterCard = `
            <div class = "character-card" id = "character-${character.id}">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}">
                <p class = "card-name">${character.name}</p>
                <div id = "favChar-${character.id}" class="favourite-btn">
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>`
        characterContainer.innerHTML+=characterCard;
    });
}

//display favourite comics
const displayComic = (comic)=>{
    //fetch comic details
    getdata(`${marvelURL}comics/${comic}?${marvelURLHeader}`)
    .then(data=>data[0])
    .then(comic=>{
        let comicCard = `
            <div class = "character-card" id = "comic-${comic.id}">
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}">
                <p class = "card-name">${comic.title}</p>
                <div id = "favComic-${comic.id}" class="favourite-btn">
                    <i class="fa-solid fa-star"></i>
                </i></div>
            </div>`
        comicContainer.innerHTML+=comicCard;
     });
}

//fetch favourite characters and comics from local storage
let charArray = JSON.parse(localStorage.getItem('favChar'));
let comicArray = JSON.parse(localStorage.getItem('favComic'));

if(charArray == null || charArray.length == 0){
   document.getElementById('char-empty').innerHTML += `
            <br>
            <br>
            <h5>Nothing here, Add to favourite to display here</h5>
            <br>
            <br>`;
}
else{
    document.getElementById('char-empty').innerHTML += "";
}
if(comicArray == null || comicArray.length == 0){
    document.getElementById('comic-empty').innerHTML += `
            <br>
            <br>
            <h5>Nothing here, Add to favourite to display here</h5>
            <br>
            <br> `;
}
else{
    document.getElementById('comic-empty').innerHTML += "";
}

charArray.map(character=>displayCharacter(character));
comicArray.map(comic=>displayComic(comic));