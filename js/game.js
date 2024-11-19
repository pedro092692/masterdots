/* JS game
@author Pedro Bastidas <pedro092692@hotmail.com>
@link github
*/

// global vars
var start_marking = false;
var adjacents = [];
var id_markeds = [];
var marked_class;
var size;
var colors = ['green', 'red'];

//random number funcion 
function get_random_int(max){
    return Math.floor(Math.random() * max);
}

// paint parent item element function
function paint_element(item){
    let container_item = item.parentElement;
    if(item.classList.contains('red')){
        marked_class = 'red';
        container_item.classList.add('red');
    }else{
        marked_class = 'green';
        container_item.classList.add('green');
    }
}


// auto fill user data
function fill_user_form(){
    document.getElementById('nick').value = nick;
    document.getElementById('avatar_img').src = current_avatar_img;
    size = parseInt(current_game_size);
}

// draw game size
function draw_game_size(){
    document.getElementById('game').style.gridTemplateColumns="repeat("+current_game_size+", 1fr)";
    document.getElementById('game').style.gridTemplateRows="repeat("+current_game_size+", 1fr)";
    // matrix elements
    let items = '';
    let radom_color = 0
    for(let i = 0; i < (parseInt(current_game_size)*parseInt(current_game_size)); i++){
        if(i % 2 > 0){
            radom_color=get_random_int(2);
        }
        items+= `<div class="container_item"><div id="${i}" class="item ${colors[radom_color]}"></div></div>`;

    }
    document.getElementById('game').innerHTML = items;
}


// calcule adjacent

function calcule_adjacents(mark_id){
    adjacents=[];
    // upper adjacent
    if((mark_id - size) >=0 ) adjacents.push(mark_id - size);
    // lower adjacent
    if((mark_id + size) < size*size) adjacents.push(mark_id + size);
    // left adjacent
    if((mark_id % size) > 0) adjacents.push(mark_id - 1);
    // right adjacent
    if(((mark_id + 1) % size) > 0) adjacents.push(mark_id + 1);

}


// game events 
function set_game_events(){
    const items = document.getElementsByClassName('item');
    for(let item of items){
        item.addEventListener('mousedown', start_mark);
        item.addEventListener('mouseover', continue_mark);
    }
    document.addEventListener('mouseup', end_mark);
}

// game functions

// start mark
function start_mark(event){
    let item = event.target;
    paint_element(item);
    if(!start_marking){
        start_marking = true;
    }

    //save marked items
    id_markeds.push(parseInt(item.id));

    // start calc adjacents
    calcule_adjacents(parseInt(item.id));
    console.log('click on a circle');
}

function continue_mark(event){
    let item = event.target;
    let new_id = parseInt(item.id)
    if(start_marking){
        if(adjacents.includes(new_id) && item.classList.contains(marked_class)){
            paint_element(item);
            console.log('pass over a circle');
            //save marked items
            id_markeds.push(parseInt(item.id));
            calcule_adjacents(parseInt(item.id));
        }
    }
}

function end_mark(event){
    start_marking = false;
    adjacents = [];
    // add score
    const score = document.getElementById('score');
    if(id_markeds.length>1){
        score.value = parseInt(score.value) + id_markeds.length;
    }
    // work with marked items 
    for(let i = 0; i < id_markeds.length; i++){
        // capture the object
        let marked_item = document.getElementById(id_markeds[i]);
        //change color 
        let random_number = get_random_int(2);
        marked_item.parentElement.classList.remove(marked_class);
        marked_item.classList.remove(marked_class);
        marked_item.classList.add(colors[random_number]);

    }
    id_markeds= [];
    console.log('end mark');
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