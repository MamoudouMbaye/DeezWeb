'use strict';

/*const searchParams = new URL(location.href).search;*/
const urlSearchParams = new URLSearchParams(new URL(document.location.href).search);
const albumId = urlSearchParams.get('id');
let albumCnt = document.querySelector('#album-cnt');
console.log(albumId);

window.fetch(`https://api.deezer.com/album/${albumId}`) //on récupère les infos de l'API grâce à search-bar & dw-select
.then(response => response.json())
.then(result => {
    console.log(result);
    //on crée le html
    albumCnt.innerHTML = `
        <div>
            <img src="${result.cover_xl}" alt="Album cover">
        </div>
        <div>
            <span>Album</span>
            <h2>${result.title}</h2>
            <span>Artist •</span> <a id="album-artist" href="artist.html?id=${result.artist.id}">${result.artist.name}</a>
            <a href="https://www.deezer.com/fr/artist/${result.artist.id}" id="search-button" target="_blank">Voir sur Deezer</a>
        </div>
    `;

    //boucle pour récupérer chaque chanson de l'album
    for (let i = 0, trackList = result.tracks.data; i < result.nb_tracks ; i++) {
        let durationToHms = secondsToHms(trackList[i].duration);
        let newTrack = document.createElement('div');

        newTrack.innerHTML = `
            <span><a href="track.html?id=${trackList[i].id}">${trackList[i].title}</a></span>
            <span>${durationToHms}</span>
        `;

        document.querySelector('#track-list').appendChild(newTrack); //on crée les liens vers les chansons
    }

});
