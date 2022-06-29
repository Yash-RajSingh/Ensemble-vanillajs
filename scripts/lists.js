// GETTING ALL THE REQUIRED DOM ELEMENTS
const head = document.querySelector('.head');
const contain = document.querySelector('.container');
const form = document.getElementById('add');

// GETTING REQUIRED ITEMS FROM SESSION STORAGE
const bid= sessionStorage.getItem("currboard");
const token = sessionStorage.getItem("token");

// CALLING DISPLAY FUNCTION AFTER DELAY
const reupdate = () =>{
    const dispDelay = setTimeout(disp, 1000);
    function disp() {
        displayLists();
    }
    function stopdisp() {
        clearTimeout(disp);
    }
    stopdisp();  
}


// DISPLAYING THE LISTS
const displayLists = () =>{
    const base = `https://ensemble-apis.herokuapp.com/lists/get_board_lists`;
    const req = `?board_fid=${bid}&token=${token}`;
    const query = `${base}${req}`;
    const getLists = async () =>{
        const response = await fetch(query, {
            method: 'GET'
            });
            const data = await response.json();
            var ldata = data.data;
            console.log(ldata)
            contain.innerHTML = ``;
            ldata.forEach(current => {
                console.log(current)
                contain.innerHTML += `
                <div class="card" id="${current.list_luid}">
                <b> ${current.list_name}</b><br>
                <button class="btn" onclick="startUpdate('${current.list_luid}')">Edit</button>
                <button class="btn" onclick="remove('${current.list_luid}')">Delete</button>
                <button class="btn" onclick="Addtask('${current.list_luid}')">Task +</button>
                <center><button class="btn" onclick="Expand('${current.list_luid}')">⮟</button></center>
                </div>
                `
            });
            // for( var i in ldata){
            //     var currl = ldata[i];
            //     var jcurrl = Array.from(currl);
            // }
    }
    getLists();

}
displayLists();


// INSERTING THE LISTS
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const lname = $('#lname').val();
    const insertBoard = () => {
    const base = `https://ensemble-apis.herokuapp.com/lists/insert_list`;
    const req = `?board_fid=${bid}&name=${lname}&color_code=1&token=${token}`;
    const query = `${base}${req}`;
    const getLists = async () =>{
        const response = await fetch(query, {
            method: 'POST'
            });
            const data = await response.json();
        }
        getLists();
    }
    insertBoard();
    reupdate();
}) 



//DELETING LISTS
const remove = (id) => {
    const luid = id;
    const deleteList = () =>{
        const base = `https://ensemble-apis.herokuapp.com/lists/delete_list`;
        const req = `?luid=${luid}&token=${token}`;
        const query = `${base}${req}`;
        const del = async () =>{
            const response = await fetch(query, {
                method: 'DELETE'
                });
            }
        del();
    }
    deleteList();
    reupdate();
}

//UPDATING LISTS
const updater = document.querySelector('.ulist');
const startUpdate = (id) => {
    updater.style.display = "block";
    updater.style.WebkitAnimation = "slider 2s ease-in-out";
    var luid = id;
    $('#ulist').submit(function (e) {
        e.preventDefault();
        const ulname = $('#ulname').val();
        const updateList = () =>{
            const base = `https://ensemble-apis.herokuapp.com/lists/update_list`;
            const req = `?luid=${luid}&token=${token}&name=${ulname}`;
            const query = `${base}${req}`;
            const up = async () =>{
                const response = await fetch(query, {
                    method: 'POST'
                    });
                }
                up();
        }
        updateList();
        reupdate();
        updater.style.display = "none";

    })
}



/////////// HANDLING TASKS///////////

const Addtask = (id) =>{
    const list = document.getElementById(id);
    list.innerHTML += `<div id="tadd">
        <form id="task">
        <label for="tname">Task name</label>
        <input type="text" id="tname" placeholder="Enter task name" autocomplete="off">
        <label for="tdesc">Task description</label>
        <input type="text" id="tdesc" placeholder="Enter task description" autocomplete="off">
        <label for="tdate">Due date</label>
        <input type="date" id="tdate" placeholder="Enter due date"> 
        <label for="status">Status</label>
        <select id="status">
            <option disabled hidden selected>Choose</option>
            <option value="1">Not started</option>
            <option value="2">In progress</option>
            <option value="3">Completed</option>
        </select>
        <button type="submit" onclick="add('${id}')">+</button>
        </form>
        </div>`;
    
    }

//ADDING TASKS
const add = (id) =>{
    $('#task').submit(function (e) {
        const activelist = document.getElementById(id);
        var lid = id;
        e.preventDefault();
        const tname =  $('#tname').val();
        const tdesc = $('#tdesc').val();
        const tdate = $('#tdate').val();
        const tstatus = $('#status').val();
        if(tstatus==1){
            var col = `Not Started`;
        }else if(tstatus==2){
            var col = `In Progress`;
        }else if(tstatus==3){
            var col = `Completed`;
        }
        activelist.innerHTML += `<div class="subcard"><b>${tname}</b><br> ${tdesc}<br><b>Due: ${tdate}</b> ${col}</div>`
        const insertTask = () =>{
        const base = `https://ensemble-apis.herokuapp.com/tasks/insert_task`;
        const req = `?task_name=${tname}&task_description=${tdesc}&Task_completion=${tstatus}&Due_date_time=${tdate}&list_fid=${lid}&token=${token}`;
        const query = `${base}${req}`;
        const addTasks = async () =>{
            const response = await fetch(query, {
                method: 'POST'
                });
                const data = await response.json();
            }
            addTasks();
        }
        insertTask();
        $('#task').remove();
    })
}

/// DISPLAYING TASKS
const Expand = (id) =>{
    const base = `https://ensemble-apis.herokuapp.com/tasks/get_all_tasks`;
    const req = `?list_fid=${id}&token=${token}`;
    const query = `${base}${req}`;
    const activelist = document.getElementById(id);
    const getTasks = async () =>{
        const response = await fetch(query, {
            method: 'POST'
            });
            const data = await response.json();
            var dat = data.data;
            let col;
            for(var z in dat){
                console.log(dat[z]);
                var activeData = dat[z];
                if(activeData[3]==0){
                    col = "Not started";
                }
                else if(activeData[3]==1){
                    col = "Not started";
                }
                else if(activeData[3]==2){
                    col = "In progress";
                }
                else if(activeData[3]==3){
                    col = "Completed";
                }
                console.log(col);
                activelist.innerHTML += `
                <div class="subcard"><b>${activeData[1]}</b><br> ${activeData[2]}<br><b>Due: ${activeData[4]}</b> ${col}</div>
                `
            }
    }
    getTasks();
}




///ADDING MEMBERS TO WORKSPACE
const sidebar = document.getElementById('sidebar');
const expand = document.getElementById('expand');
const memlist = document.getElementById('mems');
const memaddBlock = document.getElementById('memberadder');
const memAddForm = document.getElementById('addmem');
const memresp = document.getElementById('memresp');
const memberBlock = document.getElementById('members');

// TOGGLING SIDEBAR
expand.addEventListener('click', ()=>{
    if(sidebar.style.width == "30px"){
        sidebar.style.WebkitAnimation = "slide 1s ease-out";
        memlist.style.display = "block";
        memaddBlock.style.display = "block";
        memresp.style.display = "block";
        memberBlock.style.display = "block";
        sidebar.style.width = "200px";
    }else {
        sidebar.style.width = "30px";
        sidebar.style.WebkitAnimation = "rslide 1s ease-in";
        memlist.style.display = "none";
        memaddBlock.style.display = "none";
        memberBlock.style.display = "none";
        memresp.style.display = "none";
    }
})


//ADDING MEMBERS
memAddForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    memlist.style.display = "block";
    const memail = $('#memail').val();
    const base = `https://ensemble-apis.herokuapp.com/members/add_member`;
    const req = `?buid=${bid}&email=${memail}&token=${token}`;
    const query = `${base}${req}`;
    const addMembers = async () =>{
        const response = await fetch(query, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        memresp.innerText = `${data.message}`;
    }
    addMembers();
})


memlist.addEventListener('click', (e) =>{
    e.preventDefault();
    const base = `https://ensemble-apis.herokuapp.com/members/get_members`;
    const req = `?buid=${bid}&token=${token}`;
    const query = `${base}${req}`;
    const getMembers = async () =>{
        const response = await fetch(query, {
            method: 'POST'
        });
        const data = await response.json();
        let memcount = data.members.length;
        memberBlock.innerHTML = ``;
        memlist.style.display = "none";
        for(var t=0; t<memcount; t++ ){
            let members = data.members[t]
            console.log(members[1]);
            console.log(members[2]);
            console.log(members[3]);
            if(members[3]=="creator"){
                memberBlock.innerHTML += `<div id="${members[0]}" class="memcard2">
            <b>${members[1]}<b> <br>
            Role: ${members[3]} 
            </div>`
            }else{
                memberBlock.innerHTML += `<div id="${members[0]}" class="memcard2">
                <b>${members[1]}<b> <br>
                Role: ${members[3]} &emsp; <button class="btn3" onclick="removeMember('${members[0]}')">Remove</button>
                </div>`
            }
        }
        // memlist.innerText = `${data.message}`;
    }
    getMembers();
})

const removeMember = (id) =>{
    const iid = id;
    const curMember = $(`#${iid}`);
    console.log(curMember);
    const base = `https://ensemble-apis.herokuapp.com/members/delete_member`;
    const req = `?buid=${bid}&uid=${iid}&token=${token}`;
    const query = `${base}${req}`;
    const delMembers = async () =>{
        const response = await fetch(query, {
            method: 'DELETE'
        });
        const data = await response.json();
        memresp.innerHTML = `${data.message}` 
        console.log(data.message);
    }
    delMembers();
    curMember.remove();
}