//SETTING UP HOVER INSTRUCTIONS DISPLAY
const instructions = document.getElementById('instructions');
$(".iboard2").hover(function(){
    $(instructions).show();
    }, function(){
    $(instructions).hide();
  });



// GETTING THE REQUIRED DOM COMPONENTS
const welMsg = document.getElementById('name');
const container = document.getElementById('container');



//GETIING SESSION STORGAE ITEMS
const username = sessionStorage.getItem("uname");
const token = sessionStorage.getItem("token");
const uid= sessionStorage.getItem("uid");
welMsg.textContent = `Welcome ${username}`;


//DISPLAY DELAY TIMER
const reupdate = () =>{
    const dispDelay = setTimeout(disp, 1000);
    function disp() {
        displayBoards();
    }
    function stopdisp() {
        clearTimeout(disp);
    }
    stopdisp();  
}



//Displaying Boards
const displayBoards = () =>{
    const base = `https://ensemble-p1.herokuapp.com/boards/get_boards`;
    const req = `?uid=${uid}&token=${token}`;
    const query = `${base}${req}`;
    const getBoards = async () =>{
        const response = await fetch(query, {
            method: 'POST'
            });
            const data = await response.json();
            const bdata = data.data;
            container.innerHTML = ``;
            for( var i in bdata){
                var curr = bdata[i];
                var jcurr = Array.from(curr);
                container.innerHTML += `
                <div class="card" id="${jcurr[3]}">
                <b>Title - ${jcurr[1]}</b><br>
                Description - ${jcurr[2]}<br>
                <button class="btn" onclick="update('${jcurr[3]}')">Edit</button>
                <button class="btn" onclick="remove('${jcurr[3]}')">Delete</button>
                </div>
                `
            }
    }
    getBoards();
}

displayBoards();



// INSERTING BOARD 
const form = document.getElementById('iboard');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById("bname").value;
    const descp = document.getElementById("desc").value;
    const base = `https://ensemble-p1.herokuapp.com/boards/insert_board`;
    const req = `?title=${title}&description=${descp}&creator_id=${uid}&token=${token}`;
    const query = `${base}${req}`;
    const insertBoards = async () => {
        const response = await fetch(query, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data.message);
    }
    insertBoards();
    reupdate();
})


//SETTING UP REMOVE AND UPDATE FUNCTIONALITY

//DELETING BOARDS

const remove = (id) => {
    const buid = id;
    const deleteBoard = () =>{
        const base = `https://ensemble-p1.herokuapp.com/boards/delete_board`;
        const req = `?buid=${buid}&token=${token}`;
        const query = `${base}${req}`;
        const del = async () =>{
            const response = await fetch(query, {
                method: 'DELETE'
                });
                const data = await response.json();
            }
        del();
    }
    deleteBoard();
    reupdate();
    
}
const startUpdate = () => {
}