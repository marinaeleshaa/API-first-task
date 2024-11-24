var PostName = document.getElementById("item-name");
var PostBody = document.getElementById("item-body");

function GetPosts(userId) {
  let request = new XMLHttpRequest();

  request.open(
    "get",
    "https://jsonplaceholder.typicode.com/posts?userId=" + userId
  );
  request.responseType = "json";
  request.setRequestHeader("accept", "application/json");
  request.setRequestHeader("content-type", "application/json");
  request.send();

  request.onload = function () {
    let posts = request.response;
    if (request.status >= 200 && request.status < 300) {
      PostBody.innerHTML = "";
      posts.map((i) => {
        fillPostBody(i);
      });
    } else {
      alert("error");
    }
  };
}

function fillPostBody(x) {
  let content = `<div class="bg-light rounded-5 p-2 shadow text-primary">
            <h4>${x.title}</h4>
            <p>
            ${x.body}
            </p>
          </div>`;
  PostBody.innerHTML += content;
}

function GetUsers() {
  let request = new XMLHttpRequest();

  request.open("get", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.setRequestHeader("accept", "application/json");
  request.setRequestHeader("content-type", "application/json");
  request.send();

  request.onload = function () {
    let posts = request.response;
    if (request.status >= 200 && request.status < 300) {
      PostName.innerHTML = "";
      posts.map((i) => {
        fillPostName(i);
      });
    } else {
      alert("error");
    }
  };
}

function fillPostName(x) {
  let content = `<div class="bg-light rounded-5 px-3 py-1 text-capitalize text-primary " id="user" onclick="userClicked(${x.id},this)">
  <h4 class="m-0">${x.name}</h4>
  <p class="m-0">${x.email}</p>
</div>`;
  PostName.innerHTML += content;
}

function userClicked(id ,el) {
  GetPosts(id);
  let selectedEl = document.getElementsByClassName("selected")
  Array.from(selectedEl).forEach(element => {
    element.classList.remove("selected")
  });
  el.classList.add("selected")
}

GetUsers();
