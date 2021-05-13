//on récupère les données du localStorage
let trackId = localStorage.getItem('tracksIds');
let idsList = JSON.parse(trackId);

for (let i = 0; i < idsList.length; i++) {

    window.fetch(`https://api.deezer.com/track/${idsList[i]}`) //infos de l'API
    .then(response => response.json())
    .then(result => {
        //création div parent #trackLike
        const favInfos = document.createElement('div');
        favInfos.setAttribute('id', `trackLike-${i}`);

        document.querySelector('#favorites').appendChild(favInfos); // Ajout en HTML du tableau des titres likées
        favInfos.innerHTML = `
        
            <div id="trackTitle-${i}">
                <a href="track.html?id=${result.id}">${result.title}</a>
                <p>${result.artist.name}</p>
            </div>
            <span>Album</span>
        `;

        //ajout des boutons favoris
        const $favoriteTrack = document.createElement('button');

        //event au clic sur le bouton
        $favoriteTrack.addEventListener("click", () => {
            let trackList = localStorage.getItem('tracksIds');
            trackList = JSON.parse(trackList);

            //suppression du localStorage
            trackList.splice(trackList.indexOf(idsList[i]), 1);
            localStorage.setItem('tracksIds', JSON.stringify(trackList));
            
            //suppression du DOM
            document.querySelector(`#trackLike-${i}`).remove();
        });

        let trackLike = document.querySelector(`#trackLike-${i}`);
        let trackTitle = document.querySelector(`#trackTitle-${i}`);
        trackLike.insertBefore($favoriteTrack, trackTitle);
    });
}

