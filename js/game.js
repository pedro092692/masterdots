/* JS game
@author Pedro Bastidas <pedro092692@hotmail.com>
@link github
*/

//random number funcion 
function get_random_int(max){
    return Math.floor(Math.random() * max);
}


// auto fill user data
function fill_user_form(){
    document.getElementById('nick').value = nick;
    document.getElementById('avatar_img').src = current_avatar_img;
}

// draw game size
function draw_game_size(){
    document.getElementById('game').style.gridTemplateColumns="repeat("+current_game_size+", 1fr)";
    document.getElementById('game').style.gridTemplateRows="repeat("+current_game_size+", 1fr)";
    // matrix elements
    let items = '';
    let colors = ['green', 'red'];
    let radom_color = 0
    for(let i = 0; i < (parseInt(current_game_size)*parseInt(current_game_size)); i++){
        if(i % 2 > 0){
            radom_color=get_random_int(2);
        }
        items+= `<div class="container_item"><div class="item ${colors[radom_color]}"></div></div>`;

    }
    document.getElementById('game').innerHTML = items;
}

// game events 
function set_game_events(){
    const items = document.getElementsByClassName('item');
    for(let item of items){
        item.addEventListener('mousedown', start_mark);
    }
}

// game functions
function start_mark(event){
    let item = event.target;
    let container_item = item.parentElement;
    if(item.classList.contains('red')){
        container_item.classList.add('red');
    }else{
        container_item.classList.add('green');
    }
    console.log('click on a circle');
}


// capture user data
get_user_data();

// check user data
if(!check_user_data()){
    location = 'index.html';
}

// fill user data form
fill_user_form();

// draw game board
draw_game_size();

// set game events
set_game_events();