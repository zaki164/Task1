let emailEle = document.getElementsByClassName("logged_email")[0];
emailEle.textContent = localStorage.getItem("email");
