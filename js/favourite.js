if(localStorage.getItem('favChar')==null){
    let idArr = [];
    let idString = JSON.stringify(idArr)
    localStorage.setItem('favChar',idString);
}
if(localStorage.getItem('favComic')==null){
    let idArr = [];
    let idString = JSON.stringify(idArr)
    localStorage.setItem('favComic',idString);
}

//Toggle favourite
const toggleFav = (type,id)=>{
    let idArr = [];
    let favBtn = document.querySelector(`#${type}-${id}`);
    //if character is not added as favourite add else remove
    idArr = JSON.parse(localStorage.getItem(type));
    let idx = idArr.indexOf(id);
    if(idx==-1){
        idArr.push(id);
        favBtn.innerHTML = '<i class="fa-solid fa-star"></i>';
        favBtn.style.display = 'block';
    }
    else{
        idArr.splice(idx,1);
        favBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
        favBtn.style.display = 'none';
    }
    //store data to localstorage
    let idString = JSON.stringify(idArr)
    localStorage.setItem(type,idString);
    console.log(localStorage.getItem(type));

    //if request comes from favourite page remove card from DOM
    if((window.location.href).split('/').splice(-1)=='favorite.html'){
        if(type=='favComic'){
            document.getElementById(`comic-${id}`).remove();
        }
        document.getElementById(`character-${id}`).remove();
    }
}

//check if a character or comic is present in favourite list
 const isFavourite=(type,id)=>{
    let idArr = JSON.parse(localStorage.getItem(type));
    let favBtn = document.querySelector(`#${type}-${id}`);
    try {
        let idx = idArr.indexOf(id.toString());
        if(idx==-1){
            favBtn.innerHTML = '<i class="fa-regular fa-star" title = "Add Favourite"></i>';
            favBtn.style.display = 'none';
        }else{
            favBtn.innerHTML = '<i class="fa-solid fa-star" title = "Remove Favourite"></i>';
            favBtn.style.display = 'block';
        }
    } catch (error) {
        console.log(error)
    }
 }

 //add click listner to card and favourite button
 document.addEventListener('click',event => {
    try {        
        if(event.target.className=='favourite-btn'){
            let type =event.target.id.split('-')
            toggleFav(type[0],type[1]);
        }
        else if(event.target.parentElement.className=='favourite-btn'){
            let type = event.target.parentElement.id.split('-');
            toggleFav(type[0],type[1]);
        }
        else if(event.target.className=='character-card'){
            let type = event.target.id.split('-');
            redirect(type);
        }
        else if(event.target.parentElement.className=='character-card'){
            let type = event.target.parentElement.id.split('-');
            redirect(type);
        }
    } catch (error) {
        console.log('target doesnt have class name')
    }
})