'use strict';
const searchParams = location.search;
const urlSearchParams = new URLSearchParams(searchParams);
console.log(urlSearchParams.get('id'));
const artistId = urlSearchParams.get('id');
let artistCnt = document.querySelector('#artist');

function numFormatter(number) {
    if(number > 999 && number < 1000000){
        return (number/1000).toFixed(1) + 'K'; // conversion en milliers 
    } else if(number > 1000000){
        return (number/1000000).toFixed(1) + 'M'; // conversion en millions
    } else if(number < 900){
        return number; // si < 1000 on ne fait rien
    }
}

window.fetch(`https://api.deezer.com/artist/${artistId}`) //on récupère les infos de l'API grâce à search-bar & dw-select
.then(response => response.json())
.then(result => {
    const artistCover = result.picture_xl;
    artistCnt.style.backgroundImage = `url('${artistCover}')`;

    let artistFans = numFormatter(result.nb_fan);

    const artistInfos = document.createElement('a');

    artistCnt.appendChild(artistInfos);
    artistInfos.innerHTML = `
            <h2>${result.name}</h2>
            <p>${result.nb_album} albums</p>
            <p>${artistFans} fans</p>
            <a href="${result.link}" id="search-button" target="_blank">Voir sur Deezer</a>
        `;
});