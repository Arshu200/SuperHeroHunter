var marvelAPI = secret['marvelAPI'];
var marvelURL = 'https://gateway.marvel.com/v1/public/'
var marvelURLHeader=`ts=1&apikey=${marvelAPI.apiKey}&hash=${marvelAPI.hash}`;

const getdata = async (URL)=>{
    let res = await fetch(URL);
    res = await res.json();
    let data = res.data.results;
    return data;
}