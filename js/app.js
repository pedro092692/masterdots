/* JS app
@author Pedro Bastidas <pedro092692@hotmail.com>
@link github
*/


var play_button 
var nickname 
var game_size
var form 
var email 
var avatarItems
var itemImg
var avatar
var avatarImage



/**
 * Check user info in form data
 * @date 2024-06-06
 * @param { Event } event
 */
function checkForm(event){
    if(nickname.value.length == 0){
        console.log('No nickname...');
        event.preventDefault();
        let error = document.getElementById('error-nick');
        error.style.display = 'block';
        nickname.focus();
        return false;
    }else if(game_size.value == ''){
        console.log('No game size...');
        event.preventDefault();
        let error = document.getElementById('error-game_size');
        error.style.display = 'block';
        game_size.focus();
        return false;
    }else if(email.value == ''){
        console.log('No email');
        event.preventDefault();
        let error = document.getElementById('error-email');
        error.style.display = 'block';
        email.focus();
        return false;
    }else if(nickname.value.match(/(?<!\S)[0-9]/)){
        let error = document.getElementById('error-nick');
        error.innerHTML = '';
        error.innerText = 'El nombre de usuario no puede empezar con un numero.';
        error.style.display = 'block';
        event.preventDefault();
        return false;
    }
    
    user_data(nickname, game_size, email);
    user_history(nickname);
    return true;

}

function imgMoving(event){
    itemImg = event.target;
    console.log(itemImg.src);
}

function changeAvatar(event){
    avatarImage.src = itemImg.src;
}

/**
 * capture user info elements
 * @date 2024-06-06
 */
function contentLoaded(){
    play_button = document.getElementById('play');
    nickname = document.getElementById('nick');
    game_size = document.getElementById('game_size');
    form = document.getElementById('form');
    email = document.getElementById('email');

    // check for errors 
    if(sessionStorage.getItem('error')!=null){
        let error = document.getElementById('error-nick');
        error.style.display = 'block';
        nickname.focus();
        sessionStorage.removeItem('error');
    }

    // check form 
    
    form.addEventListener('submit', checkForm);

    avatarItems = document.getElementsByClassName('avatar-img');
    avatar = document.getElementById('avatar')
    avatarImage = document.getElementById('avatarImage')
    // drag and drop events 
    for(let item of avatarItems){
        item.addEventListener('dragstart', imgMoving);
    }

    avatar.addEventListener('dragover', e=>{e.preventDefault()})
    avatar.addEventListener('drop', changeAvatar)

}


// Initiation of events 
document.addEventListener('DOMContentLoaded', contentLoaded)
// Geolocalization
geo_locate_data();