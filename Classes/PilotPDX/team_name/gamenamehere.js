var sounds = {
    backgroundMusic: null,
    shoots: null,
    geeseNoise: null,
    flapping: null,
    splashOnWater: null,
    collidingNoise: null,
    buyingNoise: null,
    bossSpawning: null,
    bossDefeat: null

}
$(function() {
    // initialize anything here
    playfield = document.getElementById('playfield');
    context = playfield.getContext("");
    // initialization routine(s)
    initializeListeners();
    initializeAudio();

});

function initializeAudio() {
    sounds.backgroundMusic = new Audio("Laser gun sound effect (2).wav");
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = .25;
    sounds.backgroundMusic.load();
    sounds.backgroundMusic.onLoadedData = loadComplete;
    sounds.gameOver = new Audio("audio/76376__deleted-user-877451__game-over.wav");
    sounds.gameOver.load();
    sounds.gameOver.onLoadedData = loadComplete;
}
