let nameDiv = document.getElementById("item-name");
let postDiv = document.getElementById("item-body");

function getName() {
  let request = new XMLHttpRequest();
  request.open("get", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.setRequestHeader("accept", "application/json");
  request.setRequestHeader("content-type", "application/json");
  request.send();
  request.onload = function () {
    let names = request.response;
    if (request.status >= 200 && request.status < 300) {
      nameDiv.innerHTML = "";
      names.map((i) => {
        fillNames(i);
      });
    }
  };
}

function fillNames(user) {
  let content = `<div
            class="bg-light rounded-5 p-2 text-capitalize text-primary"
            id="user"
            onClick="userClicked(${user.id},this)"
          >
            <h4 class="m-0">${user.name}</h4>
            <p class="m-0">${user.email}</p>
          </div>`;

  nameDiv.innerHTML += content;
}

function userClicked (id ,item){
  getPosts(id)
  let clickedDiv = document.getElementsByClassName("selected")
  for (div of clickedDiv){
    div.classList.remove("selected")
  }
  item.classList.add("selected","shadow")
}

function getPosts(userID) {
  let request = new XMLHttpRequest();
  request.open("get", "https://jsonplaceholder.typicode.com/posts?userId="+userID);
  request.responseType = "json";
  request.setRequestHeader("accept", "application/json");
  request.setRequestHeader("content-type", "application/json");
  request.send();
  request.onload = function () {
    let names = request.response;
    if (request.status >= 200 && request.status < 300) {
      postDiv.innerHTML = "";
      names.map((i) => {
        fillPosts(i);
      });
    }
  };
}

function fillPosts(post) {
  let content = `<div class="bg-light rounded-5 p-2 shadow text-primary">
            <h4>${post.title}</h4>
            <p>
              ${post.body}
            </p>
          </div>`;
  postDiv.innerHTML += content;
}
getName();
getPosts()