const api = "https://randomuser.me/api";
const addUser = document.getElementById("user-btn");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const sortdesc = document.getElementById("sort-desc");
const sortasc = document.getElementById("sort-asc");

const appState = [];
//becoz we only want few data. storage will increase if not using class
class User {
  constructor(title, firstname, lastname, gender, email) {
    this.name = `${title} ${firstname} ${lastname}`;
    this.gender = gender;
    this.email = email;
  }
}
addUser.addEventListener("click", async function () {
  console.log("fetch now");
  const userData = await fetch(api, {
    method: "GET"
  });

  const userJson = await userData.json();
  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);
  console.log(appState);
  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEle = document.createElement("div");
    //attaching data from api to the above div
    userEle.innerHTML = `<div>
    Name:  ${userObj.name}
     <ol>
     <li>${userObj.gender}</li>
     <li>${userObj.email}</li>
     </ol>
     </div>`;
    userList.appendChild(userEle);
  });
};

//implementing search feature
//with onchange we will have to refer to the value also, so implementing with onKeyup in input

searchInput.addEventListener("keyup", () => {
  console.log(searchInput.value);
  const filteredAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
});

sortdesc.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));

  domRenderer(appStateCopy);
});

sortasc.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));

  domRenderer(appStateCopy);
});
