let searchString = "";
let characterContainer = document.querySelector('#character-container');
let comicContainer = document.querySelector('#comic-container');
let searchBar = document.querySelector('#search-bar');
let searchSuggestions = document.querySelector('#search-suggestions>ul')

let redirect = (type)=>{
    window.location.href = `./html/${type[0]}.html?id=${type[1]}`;
}

//display characters
const displayCharacters = (character)=>{
    if(character.description.length>0){
        let characterCard = `
            <div class = "character-card" id = "character-${character.id}">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}">
                <p class = "card-name">${character.name}</p>
                <div id = "favChar-${character.id}" class="favourite-btn">
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>`
        characterContainer.innerHTML+=characterCard;
        isFavourite('favChar',character.id);
    }
};

//display comics
const displayComics = (comic)=>{
        let comicCard = `
            <div class = "character-card" id = "comic-${comic.id}">
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}">
                <p class = "card-name">${comic.title}</p>
                <div id = "favComic-${comic.id}" class="favourite-btn">
                    <i class="fa-solid fa-star"></i>
                </i></div>
            </div>`
        comicContainer.innerHTML+=comicCard;
        isFavourite('favComic',comic.id);
};

//display search suggestions
const displaySearchSuggestion = (searchSuggestion)=>{
    if(searchSuggestion.description.length>0){
        let suggestion = `
            <li class="list-group-item" onclick="redirect(['character',${searchSuggestion.id}])">
                <div style="display:flex">
                    <img src = "${searchSuggestion.thumbnail.path}.${searchSuggestion.thumbnail.extension}" width = 50>
                    <p>${searchSuggestion.name}</p>
                </div>
            </li>` 
       searchSuggestions.insertAdjacentHTML('afterbegin',suggestion)
    }
}

//fetch results from marvel api when search string changes
searchBar.addEventListener('keyup',()=>{
    searchString = searchBar.value;
    if(searchString.length>0){
        let marvelSearchURL = `${marvelURL}characters?nameStartsWith=${searchString}&${marvelURLHeader}`;
        searchSuggestions.innerHTML = "";
        getdata(marvelSearchURL).then((data)=>{data.map(displaySearchSuggestion)})
    }
    else{
        searchSuggestions.innerHTML = "";
    }
});

//display charactersand comics
getdata(`${marvelURL}characters?${marvelURLHeader}&limit=100&orderBy=name`).then((data)=>{data.map(displayCharacters)});
getdata(`${marvelURL}comics?${marvelURLHeader}`).then(data=>data.map(displayComics));

