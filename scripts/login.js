// SWITCHING BETWEEN LOGIN AND SIGNUP CARDS
function toggle() {
    var lcard = document.getElementById("card-login");
    var scard = document.getElementById("card-signup");
    var head = document.querySelector('h1');
    console.log(head);
    if (scard.style.display === "none") {
        lcard.style.display = "none";
        scard.style.display = "block";
        head.textContent = "Just one last step before you're all set to go!";
      } else {
        lcard.style.display = "block";
        scard.style.display = "none";
        head.textContent = 'Welcome back to Ensemble!';
      }
};


const signup = document.getElementById('signup');
signup.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.getElementById('semail').value;
    const sname = document.getElementById('susername').value;
    const password = document.getElementById('spassword').value;
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    console.log(email, sname,password, question, answer);
})



const login = document.getElementById('login');
login.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);
})