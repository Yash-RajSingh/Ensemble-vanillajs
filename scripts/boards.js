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
    const base = `https://ensemble-p2.herokuapp.com/boards/get_all_boards`;
    const req = `?uid=${uid}&token=${token}`;
    const query = `${base}${req}`;
    const getBoards = async () =>{
        const response = await fetch(query, {
            method: 'POST'
            });
            const data = await response.json();
            const bdata = data.data;
            console.log(bdata);
            container.innerHTML = ``;
            for( var i in bdata){
                var curr = bdata[i];
                var jcurr = Array.from(curr);
                container.innerHTML += `
                <div class="card" id="${jcurr[3]}">
                <b>${jcurr[1]}</b><br>
                ${jcurr[2]}<br>
                <button class="btn" onclick="OpenBoard('${jcurr[3]}')">Open</button>
                <button class="btn" onclick="startUpdate('${jcurr[3]}')">Edit</button>
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
    const base = `https://ensemble-p2.herokuapp.com/boards/insert_board`;
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
        const base = `https://ensemble-p2.herokuapp.com/boards/delete_board`;
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

const updater = document.getElementById('updata');
//UPLOADING BOARDS
const startUpdate = (id) => {
    updater.style.display = "block";
    updater.style.WebkitAnimation = "slider 2s ease-in-out";
    var buid = id;
    console.log("init=",buid);
    $('#uboard').submit(function (e) {
        e.preventDefault();
        const uname = $('#uname').val();
        const udesc = $('#udesc').val();
        console.log(uname,udesc);
        const updateBoard = () =>{
            const base = `https://ensemble-p2.herokuapp.com/boards/update_board`;
            const req = `?buid=${buid}&token=${token}&title=${uname}&description=${udesc}`;
            const query = `${base}${req}`;
            const up = async () =>{
                const response = await fetch(query, {
                    method: 'POST'
                    });
                    const data = await response.json();
                    console.log(data.message);
                }
                up();
        }
        updateBoard();
        reupdate();
        updater.style.display = "none";

    })
}


//OPEN BOARD FUNCTIONING
const OpenBoard = (id) => {
    sessionStorage.setItem("currboard", `${id}`);
    window.location.href = "./lists.html";
}