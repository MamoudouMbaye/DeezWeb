'use strict';
let searchBar = document.querySelector('#search-bar'); // Récupération de la valeur de l'input search-bar pour la recherche
let searchMode = document.querySelector('#dw-select'); // Récupération de le mode de tri sélectionné par l'user dans dw-select
let cardsList = document.querySelector("#cards-list"); // Après la recherche, on crée nos éléments dans cards-list
let resH2 = document.querySelector("#searchBlock h2:last-child"); // On entame le h2 selon les résultats
let searchError = document.querySelector('#search-error'); // En cas d'erreurs de recherche

// Je lance la recherche !
document.querySelector("#search-button")
.addEventListener("click", () => {
    if (searchBar.value) {
        window.fetch(`https://api.deezer.com/search?q=${searchBar.value}&order=${searchMode.value}`) // Récupération des infos de l'API grâce à search-bar & dw-select
            .then(response => response.json())
            .then(result => {
                console.log(result);

                const resultData = result.data;
                const resDataLength = resultData.length; // La variable du nombre de résultats à ajouter au h2

                // En cas de non-aboutissement de la recherche
                if (resDataLength == 0) {
                    resH2.innerHTML = `Aucun résultat`;
                }
                else {
                // Affichage du nombre de résultats
                    if (resDataLength < 2) {
                        resH2.innerHTML = `${resDataLength} Résultat`;
                    }
                    else {
                        resH2.innerHTML = `${resDataLength} Résultats`;
                    }
                }

                cardsList.innerHTML = ''; // Le bloc se vide avant chaque recherche
                searchError.innerHTML = ''; // h2 error se vide avant la recherche

                for (let i = 0; i < resDataLength; i++) {
                    let newCard = document.createElement("div");
                    let newCardLinks = document.createElement("div");
                    let newFigure = document.createElement("figure");
                    let newFigureCover = document.createElement("img");
                    newFigureCover.setAttribute("src", resultData[i].album.cover_big);
                    newFigureCover.setAttribute("alt", "Couverture d'album");
                    let newFigCaption = document.createElement("figcaption");

                    cardsList.appendChild(newCard); // Création de la nouvelle card dans #cards-list
                    newCard.appendChild(newCardLinks); // Création de div parent des liens dans la card
                    newCard.appendChild(newFigure); // Ici, la figure dans la card
                    newFigure.appendChild(newFigureCover); // Ajout de l'image de l'album dans figure
                    newFigure.appendChild(newFigCaption); // Ajout de figcaption dans figure

                    let trackId = resultData[i].id;
                
                // Button qui renvoie à la page de la track
                    newCardLinks.innerHTML += `
                        <a href="pages/track.html?id=${trackId}"></a>
                    `;

                // Fav button
                    const $favoriteTrack = document.createElement('button');

                // On vérifie ici si certaines musiques sont en favori ou non
                    let trackList = localStorage.getItem('tracksIds');
                    trackList = trackList ? JSON.parse(trackList) : [];

                    if (trackList.includes(trackId)) {
                        $favoriteTrack.style.cssText = "font-weight: 900; color: #e3502b"; //on remplit les cœurs au clic
                    }
                    else {
                        $favoriteTrack.style.cssText = "font-weight: 400"; //on remplit les cœurs au clic
                    }
                
                // On crée un event au clic pour mettre des musiques en fav
                    $favoriteTrack.addEventListener("click", () => {
                        let track_List = localStorage.getItem('tracksIds');

                    // S'il n'y en a pas on crée un tableau. Dans le cas contraire, on transforme la string en tableau
                        track_List = track_List ? JSON.parse(track_List) : [];

                    // Vérification si l'id est déjà dans le tableau. si oui on l'enlève, si non on l'ajoute
                        if (track_List.includes(trackId)) {
                        // Déjà présent ? On retire et on vide le cœur au clic
                            track_List.splice(track_List.indexOf(trackId), 1);
                            $favoriteTrack.style.cssText = "font-weight: 400";
                        }
                        else {
                        // Pas encore là ? On push l'id et on remplit le cœur au clic
                            track_List.push(trackId);
                            $favoriteTrack.style.cssText = "font-weight: 900; color: #e3502b"; 
                        }

                        localStorage.setItem('tracksIds', JSON.stringify(track_List)); // Enregistrement dans localstorage
                    });

                    newFigure.appendChild($favoriteTrack);

                    let durationToHms = secondsToHms(resultData[i].duration); // Passage de duration en heures/minutes/secondes

                    newFigCaption.innerHTML += `
                        <h3>${resultData[i].title_short}</h3>
                        <span><a href="/artist.html?id=${resultData[i].artist.id}">${resultData[i].artist.name}</a> / <a href="/album.html?id=${resultData[i].album.id}">${resultData[i].album.title}</a></span>
                        <span>${durationToHms}</span>
                    `;
                }
            })
        /* .catch(err => {
        window.alert("La recherche n'a pas abouti !"); // gestion des erreurs
        }); */
    }
    else {
        searchError.innerHTML = `<h2>Aucun résultat</h2>`; // gestion de l'erreur "recherche vide"
        cardsList.innerHTML = '';
        resH2.innerHTML = '';
    }
});
