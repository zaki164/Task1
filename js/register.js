let theForm = document.forms[0];
let userInput = document.querySelector(`input[name="username"]`);
let emailInput = document.querySelector(`input[name="email"]`);
let passInput = document.querySelector(`input[name="password"]`);
let confirmPassInput = document.querySelector(`input[name="confirm_password"]`);
let username = '',
    email = '',
    password = '',
    confirmPassword = '',
    userValid = false,
    emailValid = false,
    passValid = false,
    confirmPassValid = false;
    
theForm.onsubmit = async (e) => {
  if (userValid && emailValid && passValid && confirmPassValid) {
    try {
      let res = await fetch("https://goldblv.com/api/hiring/tasks/register", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password, confirmPassword})
      });
      let content = await res.json();
      console.log(content);
    } catch(err) {
      console.log(err)
    }
  } else {
    e.preventDefault();
  }
}
userInput.addEventListener("blur", () => {
  let val = userInput.value.trim().split(" ").join("");
  if (val) {
    let regEx = /^[a-zA-Z][a-zA-Z0-9]{3,13}[a-zA-Z]$/g;
    if (!regEx.test(val)) {
      userInput.parentElement.nextElementSibling.style.display = 'block';
      userValid = false;
    } else {
      userInput.parentElement.nextElementSibling.style.display = 'none';
      userValid = true;
      username = val;
    }
  }
})
emailInput.addEventListener("blur", () => {
  let val = emailInput.value.trim().split(" ").join("");
  if (val) {
    let regEx = /\w+\@\w+\.com/g;
    if (!regEx.test(val)) {
      emailInput.parentElement.nextElementSibling.style.display = 'block';
      emailValid = false;
    } else {
      emailInput.parentElement.nextElementSibling.style.display = 'none';
      emailValid = true;
      email = val;
      localStorage.setItem("email", email);
    }
  }
})
passInput.addEventListener("blur", () => {
  let val = passInput.value;
  if (val) {
    let regEx = /\w{8,}/g;
    if (!regEx.test(val)) {
      passInput.parentElement.nextElementSibling.style.display = 'block';
      passValid = false;
    } else {
      passInput.parentElement.nextElementSibling.style.display = 'none';
      passValid = true;
      password = val;
    }
  }
})
confirmPassInput.addEventListener("blur", () => {
  let val = confirmPassInput.value;
  if (val) {
    if (val !== password) {
      confirmPassInput.parentElement.nextElementSibling.style.display = 'block';
      confirmPassValid = false;
    } else {
      confirmPassInput.parentElement.nextElementSibling.style.display = 'none';
      confirmPassValid = true;
      confirmPassword = val;
    }
  }
})

