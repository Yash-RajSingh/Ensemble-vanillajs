const form = document.getElementById('contact');
const msg = document.getElementById('resp');
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const type = $('#type').val();
    const description = $('#description').val();
    console.log(name, email, type, description);
    const base = `https://ensemble-p2.herokuapp.com/feedback/insert_feedback`;
    const query = `?name=${name}&email=${email}&ftype=${type}&description=${description}`;
    const url = `${base}${query}`
    const Send = async () => {
    const response = await fetch(url, {
      method: 'POST'
    });
    const data = await response.json();
    msg.innerText = `${data.message}`;
    console.log(data);
    }
    Send();
    form.reset();
})

// test
// test5@gmail.com 
// Feedback 
// Kitne bugs hai be sasti trello mei