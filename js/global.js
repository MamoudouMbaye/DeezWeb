// Fonction servant à la conversion les durées (secondes) en minutes et secondes
function secondsToHms(duration) {
    duration = Number(duration);

    let min = Math.floor(duration % 3600 / 60);
    let sec = Math.floor(duration % 3600 % 60);

    return ('0' + min).slice(-2) + ":" + ('0' + sec).slice(-2);
}