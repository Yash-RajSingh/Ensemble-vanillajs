//SETTING UP HOVER INSTRUCTIONS DISPLAY
const instructions = document.getElementById('instructions');
$(".iboard2").hover(function () {
    $(instructions).show();
}, function () {
    $(instructions).hide();
});


// GETTING THE REQUIRED DOM COMPONENTS
const welMsg = document.getElementById('name');
const container = document.getElementById('container');


//GETIING SESSION STORGAE ITEMS
const username = sessionStorage.getItem("uname");
const token = sessionStorage.getItem("token");
const uid = sessionStorage.getItem("uid");
welMsg.textContent = `Welcome ${username}`;


//DISPLAY DELAY TIMER
const reupdate = () => {
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
const displayBoards = () => {
    const base = `https://ensemble-apis.herokuapp.com/boards/get_boards`;
    const req = `?uid=${uid}&token=${token}`;
    const query = `${base}${req}`;
    const getBoards = async () => {
        const response = await fetch(query, {
            method: 'POST'
        });
        const data = await response.json();
        const bdata = data.data;
        console.log(bdata);
        container.innerHTML = ``;
        bdata.forEach(current => {
            console.log(current)
            container.innerHTML += `
                <div class="card" id="${current.board_buid}">
                <b>${current.board_title}</b><br>
                ${current.board_description}<br>
                <button class="btn" onclick="OpenBoard('${current.board_buid}')">Open</button>
                <button class="btn" onclick="startUpdate('${current.board_buid}')">Edit</button>
                <button class="btn" onclick="remove('${current.board_buid}')">Delete</button>
                </div>
                `

        });
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
    const base = `https://ensemble-apis.herokuapp.com/boards/insert_board`;
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
    const deleteBoard = () => {
        const base = `https://ensemble-apis.herokuapp.com/boards/delete_board`;
        const req = `?buid=${buid}&token=${token}`;
        const query = `${base}${req}`;
        const del = async () => {
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
    console.log("init=", buid);
    $('#uboard').submit(function (e) {
        e.preventDefault();
        const uname = $('#uname').val();
        const udesc = $('#udesc').val();
        console.log(uname, udesc);
        const updateBoard = () => {
            const base = `https://ensemble-apis.herokuapp.com/boards/update_board`;
            const req = `?buid=${buid}&token=${token}&title=${uname}&description=${udesc}`;
            const query = `${base}${req}`;
            const up = async () => {
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