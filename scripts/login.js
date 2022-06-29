// SWITCHING BETWEEN LOGIN AND SIGNUP CARDS
function toggle() {
  var lcard = document.getElementById("card-login");
  var scard = document.getElementById("card-signup");
  var head = document.querySelector('h1');
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




//PICKING UP RESPECTIVE DOM ELEMENTS
const signup = document.getElementById('signup');
const login = document.getElementById('login');
const lmsg = document.querySelector('.lmessage');
const smsg = document.querySelector('.smessage');
const ansresp = document.getElementById('forans');



signup.addEventListener('submit', (e) =>{
  e.preventDefault();
  const email = document.getElementById('semail').value;
  const sname = document.getElementById('susername').value;
  const password = document.getElementById('spassword').value;
  const question = document.getElementById('question').value;
  const ans = document.getElementById('answer').value;
  const answer = ans.toUpperCase();
  console.log(answer);
  const base = `https://ensemble-apis.herokuapp.com/authentication/register`;
  const req = `?username=${sname}&email=${email}&password=${password}&sec_question=${question}&sec_answer=${answer}`;
  const query = `${base}${req}`;
  const Sign = async () => {
    const response = await fetch(query, {
      method: 'POST'
  });
  const data = await response.json();
  console.log(data);
  smsg.innerHTML = `<center><h4>${data.message}</h4></center>`;
  } 
  Sign();
})



login.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const base = `https://ensemble-apis.herokuapp.com/authentication/login`;
    const req = `?email=${email}&password=${password}`;
    const query = `${base}${req}`;
    const logy = async () => {
      const response = await fetch(query, {
        method: 'POST'
      });
      const data = await response.json();
      console.log(data);
      lmsg.innerHTML = `<center><h4>${data.message}</h4></center>`;
      if(data.status == 200){
        window.location.href = './boards.html';
        sessionStorage.setItem("token", `${data.token}`);
        sessionStorage.setItem("uname", `${data.username}`);
        sessionStorage.setItem("uid", `${data.uid}`);
      }
    } 
    logy();

})







// ADDING FORGET PASSWORD FUNCTIONALITY

//TOGGLING VISIBILITY FOR FORGETPASSWORD FORM
const hmsg = document.getElementById('h1');
const forgetBlock = document.getElementById('forgetbody');
const block1 = document.getElementById('block1');
const forgettoggle = () =>{
  hmsg.style.display = "none";
  block1.style.display = "none";
  forgetBlock.style.display = "block";
}

//FINDING EMAIL
const forgetform = document.getElementById('formforget');
const fmsg = document.getElementById('fmsg');
forgetform.addEventListener('submit', (e) =>{
    e.preventDefault();
    const femail = $('#femail').val();
    sessionStorage.setItem("femail", `${femail}`);
    const base = `https://ensemble-p2.herokuapp.com/forgotpassword/forgot_validate`;
    const req = `?email=${femail}`;
    const query = `${base}${req}`;
    const checkEmail = async () => {
      const response = await fetch(query, {
        method: 'POST'
      });
      const data = await response.json();
      console.log(data);
      if(data.status==200){
        console.log("proceeding");
        fmsg.innerHTML = `${data.sec_question}`
        ansresp.style.display = "block";
      }
      else{
        fmsg.innerText = `${data.message}`;
      }
    }
    checkEmail();
})




//VALIDAING SECURITY ANSWER
const resField = document.getElementById('response');
const resField2 = document.getElementById('fresponse');
ansresp.addEventListener('submit', (e) => {
  e.preventDefault();
  const answer = $('#fanswer').val();
  var femail = sessionStorage.getItem('femail');
  console.log("checking ans");
  const base = `https://ensemble-p2.herokuapp.com/forgotpassword/forgot_update`;
  const req = `?email=${femail}&sec_answer=${answer}`;
  const query = `${base}${req}`;
  const getAns = async () => {
  const response = await fetch(query, {
    method: 'POST'
  });
    const data = await response.json();
    if(data.status==200){
      ansresp.style.display = "none";
      fmsg.style.display = "none";
      resField2.style.display = "block";
      resField.innerHTML = `${data.message}`;
    }
    else{
      resField.innerText = `Incorrect answer. Please try again`;
    }
  }
  getAns();
})


//UPDATING PASSWORD
const passform = document.getElementById('upPass');
$('#upPass').submit(function (e){
  console.log("entered 1")
  e.preventDefault();
  console.log("entered 2")
  const fpass = $('#fpass').val();
  var femail = sessionStorage.getItem('femail');
  const base = `https://ensemble-p2.herokuapp.com/forgotpassword/forgot_update_password`;
  const req = `?email=${femail}&password=${fpass}`;
  const query = `${base}${req}`;
  const updatePassword = async () => {
    const response = await fetch(query, {
      method: 'POST'
    });
    const data = await response.json();
    if(data.status==200){
      resField2.style.display = "none";
      fmsg.style.display = "block";
      fmsg.innerHTML = `${data.message}<br> Try logging in now<br><br>
      <a href="./login.html" class="btn2">Log in</a>
      `;
      resField.innerText = ``;
    }
    else{
      resField.innerText = `${data.message}`;
    }
  }
  updatePassword();
})
