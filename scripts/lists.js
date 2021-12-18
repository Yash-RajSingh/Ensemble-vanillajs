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
    const base = `https://ensemble-p2.herokuapp.com/lists/get_all_lists`;
    const req = `?board_fid=${bid}&token=${token}`;
    const query = `${base}${req}`;
    const getLists = async () =>{
        const response = await fetch(query, {
            method: 'POST'
            });
            const data = await response.json();
            var ldata = data.data;
            contain.innerHTML = ``;
            for( var i in ldata){
                var currl = ldata[i];
                var jcurrl = Array.from(currl);
                contain.innerHTML += `
                <div class="card" id="${jcurrl[3]}">
                <b>Name - ${jcurrl[1]}</b><br>
                <button class="btn" onclick="startUpdate('${jcurrl[3]}')">Edit</button>
                <button class="btn" onclick="remove('${jcurrl[3]}')">Delete</button>
                <button class="btn" onclick="Addtask('${jcurrl[3]}')">Task +</button>
                <center><button class="btn" onclick="Expand('${jcurrl[3]}')">⮟</button></center>
                </div>
                `
            }
    }
    getLists();

}
displayLists();


// INSERTING THE LISTS
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const lname = $('#lname').val();
    const insertBoard = () => {
    const base = `https://ensemble-p2.herokuapp.com/lists/insert_list`;
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
        const base = `https://ensemble-p2.herokuapp.com/lists/delete_list`;
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
            const base = `https://ensemble-p2.herokuapp.com/lists/update_list`;
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
        activelist.innerHTML += `<div class="subcard">${tname}<br> ${tdesc}<br>Due: ${tdate} ${col}</div>`
        const insertTask = () =>{
        const base = `https://ensemble-p2.herokuapp.com/tasks/insert_task`;
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
    const base = `https://ensemble-p2.herokuapp.com/tasks/get_all_tasks`;
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
                <div class="subcard">${activeData[1]}<br> ${activeData[2]}<br>Due: ${activeData[4]} ${col}</div>
                `
            }
    }
    getTasks();
}
