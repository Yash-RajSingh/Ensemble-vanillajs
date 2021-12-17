const head = document.querySelector('.head');
const bid= sessionStorage.getItem("currboard");
head.innerHTML += `<h2> Welcome to ${bid} board</h2>`;
sessionStorage.clear();
var container = document.querySelector('.container');

const form = document.getElementById('add');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = $('#lname').val();
    container.innerHTML += `<div class="card" id="">
        <div class="item">
        <h3>${name}</h3>
        <button>Add tasks</button></div>
        </div>`;  
})
    
    