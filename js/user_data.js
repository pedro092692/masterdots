/* JS for data user gestion
@author Pedro Bastidas <pedro092692@hotmail.com>
@link github
*/

var nick;
var current_game_size; 
var current_email;
var geo_locate;

/**
 * Store user data into session variable
 * @param { HTMLElement } nickname user nickname
 * @param { HTMLElement } game_size game size
 * @param { HTMLElement } email user email
 */
function user_data(nickname, game_size, email){
    sessionStorage.setItem('nick', nickname.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('game_size', game_size.value);
    sessionStorage.setItem('geo-locate', geo_locate);
}

/**
 * Get user data from Session variables
 * @date 2024-06-06
 */
function get_user_data(){
    nick = sessionStorage.getItem('nick');
    current_game_size = sessionStorage.getItem('game_size');
    current_email = sessionStorage.getItem('email');
    console.log(nick, current_email, current_game_size);
}

/**
 * Check if user nick name is not null.
 * @date 2024-06-06
 */
function check_user_data(){
    if(nick == null){
        sessionStorage.setItem('error', 'No hay nombre de usuario.');
        return false;
    }

    return true;
}


/**
 * Get current geo position of user.
 * @date 2024-06-06
 */
function geo_locate_data(){
    if(!navigator.geolocation){
        geo_locate = "Actual Browser is not compatible with geo localization.";
    }else{
        navigator.geolocation.getCurrentPosition(
            //success
            (position)=>{
                geo_locate = 'Latitude:' + position.coords.latitude + ',longitude:' + position.coords.longitude
            },
            //Error
            ()=>{geo_locate = "Geo localization not completed.";}
        );  
    }
}



/**
 * Store user info into local storage variable
 * @date 2024-06-06
 * @param { HTMLElement } nick user nick name
 */
function user_history(nick){
    let history_storage = localStorage.getItem('history');
    let history;
    if(history_storage == null){
        history = [];
    }else{
        history = JSON.parse(history_storage);
    }

    let new_user = {
        nickname: nick.value,
        date: Date.now(),
    }

    history.push(new_user);
    localStorage.setItem('history', JSON.stringify(history));
}