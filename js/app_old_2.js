//initiation of var objects and DOM
const play_button = document.getElementById('play');

// Events funcions
function checkForm(){
    // Capture nickname
    let nickname = document.getElementById('nick').value;

    // Capture game size
    let game_size = document.getElementById('game_size').value;

    console.log('Play button clicked');
}

function makeAction(){
    console.log('Make Action');
    play_button.removeEventListener('click', makeAction);
}


play_button.addEventListener('click', checkForm);
play_button.addEventListener('click', makeAction)