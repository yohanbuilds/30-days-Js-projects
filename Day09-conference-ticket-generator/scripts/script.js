const form = document.querySelector('.ticket-form');
const imageInput = document.getElementById("image-input");
const name = document.getElementById("name");
const email = document.getElementById("email");
const userName = document.getElementById("user-name");

const previewImg = document.getElementById("preview-img");
const removeBtn = document.getElementById("remove-btn");
const changeBtn = document.getElementById("change-btn");
const avatarImg = document.getElementById("avatar-img");

function addImage(){
  const file = imageInput.files[0];

  if (!file) return;

  if (file.size > 500 * 1024) {
    document.querySelector(".info").style.display = "none";
    document.getElementById("size-error").style.display = "flex";
    document.getElementById('image-error').style.display = 'none';
    return;
  }
  
  document.querySelector(".info").style.display = "flex";
  document.getElementById("size-error").style.display = "none";

  const imageURL = URL.createObjectURL(file);

  document.querySelector(".upload-input").style.display = "none";
  document.querySelector(".preview").style.display = "flex";
  document.getElementById('image-error').style.display = 'none';

  previewImg.src = imageURL;
  avatarImg.src = imageURL;
}

function removeImage() {
  document.querySelector(".upload-input").style.display = "flex";
  document.querySelector(".preview").style.display = "none";

  imageInput.value = "";
  previewImg.src = "";
  avatarImg.src = "";
}

function changeImage() {
  imageInput.click();
}

function generateTicket(){   

    document.querySelector('.form-section').style.display = 'none';

    document.getElementById('name-span').textContent = name.value;
    document.getElementById('email-span').textContent = email.value;
    document.getElementById('full-name').textContent = name.value;
    document.getElementById('github-username').textContent = userName.value;

    document.querySelector('.ticket-section').style.display = 'flex';

}

function throwError(errorElement){
    return errorElement.style.display = 'flex';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;

    if (imageInput.value.trim() === "") {
    document.getElementById("image-error").style.display = "flex";
    document.querySelector(".info").style.display = "none";
    isValid = false;
    } else {
    document.getElementById("image-error").style.display = "none";
    }

    if (name.value.trim() === "") {
    document.getElementById("name-error").style.display = "flex";
    isValid = false;
    } else {
    document.getElementById("name-error").style.display = "none";
    }

    if (email.value.trim() === "") {
    document.getElementById("email-error").style.display = "flex";
    isValid = false;
    } else {
    document.getElementById("email-error").style.display = "none";
    }

    if (userName.value.trim() === "") {
    document.getElementById("username-error").style.display = "flex";
    isValid = false;
    } else {
    document.getElementById("username-error").style.display = "none";
    }

    if (isValid) {
    generateTicket();
    }


})

imageInput.addEventListener("change", () => {
  addImage();
});

removeBtn.onclick = removeImage;
changeBtn.onclick = changeImage;

