class User {
  constructor(
    _name = "",
    _nickname = "",
    _bio = "",
    _email = "",
    _location = "",
    _blog = "",
    _hireable = false,
    _avatar = "",
    _publicRepos = 0,
    _accountLink = "",
    _company = ""
  ) {
    this.name = _name;
    this.nickname = _nickname;
    this.bio = _bio;
    this.email = _email;
    this.hireable = _hireable;
    this.avatar = _avatar;
    this.publicRepos = _publicRepos;
    this.accountLink = _accountLink;
    this.company = _company;
    this.location = _location;
    this.blog = _blog;
  }

  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get avatar() {
    return this._avatar;
  }
  get publicRepos() {
    return this._publicRepos;
  }
  get accountLink() {
    return this._accountLink;
  }
  get company() {
    return this._company;
  }
  get nickname() {
    return this._nickname;
  }
  get bio() {
    return this._bio;
  }
  get location() {
    return this._location;
  }
  get blog() {
    return this._blog;
  }
  set blog(value) {
    if (empty(value)) {
      this._blog = value;
    } else {
      this._blog = "";
    }
  }
  set location(value) {
    if (empty(value)) {
      this._location = value;
    } else {
      this._location = "";
    }
  }
  set bio(value) {
    if (empty(value)) {
      this._bio = value;
    } else {
      this._bio = "";
    }
  }
  set nickname(value) {
    if (empty(value)) {
      this._nickname = value;
    } else {
      this._nickname = "User has left the building";
    }
  }
  set company(value) {
    if (empty(value)) {
      this._company = value;
    } else {
      this._company = "";
    }
  }
  set accountLink(value) {
    if (empty(value)) {
      this._accountLink = value;
    } else {
      this._accountLink = "";
    }
  }
  set publicRepos(value) {
    if (empty(value)) {
      this._publicRepos = value;
    } else {
      this._publicRepos = "";
    }
  }
  set avatar(value) {
    if (empty(value)) {
      this._avatar = value;
    } else {
      this._avatar = "./assets/images/userHasLeftTheBuilding.svg";
    }
  }
  set email(value) {
    if (empty(value)) {
      this._email = value;
    } else {
      this._email = "";
    }
  }
  set name(value) {
    if (empty(value)) {
      this._name = value;
    } else {
      this._name = "has no name";
    }
  }
}

class Elem {
  constructor(
    _typeOf = "div",
    _input = "",
    _class = "",
    [_src, _alt, _width] = [],
    _href
  ) {
    this._alt = _alt;
    this._typeOf = _typeOf;
    this._input = _input;
    this._src = _src;
    this._width = _width;
    this._class = _class;
    this._href = _href;
  }

  get typeOf() {
    return this._typeOf;
  }
  set typeOf(value) {
    this._typeOf = value;
  }
  get input() {
    return this._input;
  }
  set input(value) {
    this._input = value;
  }
  get class() {
    return this._class;
  }
  set class(value) {
    this._class = value;
  }
  get src() {
    return this._src;
  }
  set src(value) {
    this._src = value;
  }
  get alt() {
    return this._alt;
  }
  set alt(value) {
    this._alt = value;
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
  }
  get href() {
    return this._href;
  }
  set href(value) {
    this._href = value;
  }

  createElem(append) {
    const valElem = document.createElement(this.typeOf);
    valElem.setAttribute("class", this.class);
    valElem.setAttribute("src", this.src);
    valElem.setAttribute("alt", this.alt);
    valElem.setAttribute("width", this.width);
    const textElem = document.createTextNode(this.input);
    valElem.appendChild(textElem);
    append.appendChild(valElem);
  }
}

class Text {
  constructor(_text = "") {
    this._text = _text;
  }
  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value;
  }
  createText(append) {
    const textElem = document.createTextNode(this.text);
    append.appendChild(textElem);
  }
}

class Repo {
  constructor(_name, _cloneUrl, _createdAtDate, _owner) {}
}

function empty(obj) {
  if (obj == null) {
    return false;
  }
  if (obj == undefined) {
    return false;
  }
  if (typeof obj == "string") return obj.trim() != "";
  return true;
}

function userInfoToHtml() {
  if (requestSearchUser.status == 404) {
    const divErrorContainer = document.getElementById("containerOfError");
    divErrorContainer.innerHTML = "";
    unfade(divErrorContainer);
    //<div class="error" id="error">error message</div>
    const divError = document.createElement("div");
    divError.setAttribute("class", "error");
    divErrorContainer.appendChild(divError);

    divError.appendChild(document.createTextNode("User does not exist"));
    window.setTimeout(clearError, 2000);
  }
  if (requestSearchUser.status != 404) {
    let userObj = JSON.parse(this.responseText);

    const user = new User(
      userObj.name,
      userObj.login,
      userObj.bio,
      userObj.email,
      userObj.location,
      userObj.blog,
      userObj.hireable,
      userObj.avatar_url,
      userObj.public_repos,
      userObj.html_url,
      userObj.company
    );

    document.getElementById("username").innerHTML = user.name;
    document.getElementById("avatar").setAttribute("src", user.avatar);
    document.getElementById("nickname").innerHTML = user.nickname;

    // for bio
    const bio = document.getElementById("bio");
    bio.innerHTML = "";
    new Elem("p", user.bio).createElem(bio);
    const div1 = document.createElement("div");
    new Elem("img", "", "", [
      "./assets/images/location.svg",
      "location icon",
      32
    ]).createElem(div1);
    new Text(` `).createText(div1);
    new Text(`${user.location}\n`).createText(div1);
    bio.appendChild(div1);

    bio.appendChild(document.createElement("br"));

    const div2 = document.createElement("div");
    new Elem("img", "", "", [
      "./assets/images/link.svg",
      "hyperlink icon",
      32
    ]).createElem(div2);
    new Text(` `).createText(div2);
    const alink = document.createElement("a");
    alink.setAttribute("href", `${user.blog}`);
    new Text(user.blog).createText(alink);
    div2.appendChild(alink);
    bio.appendChild(div2);
    document.createElement;

    if (user.publicRepos > 0) {
      createTimeline(user.nickname);
      // getUserEvents(user.nickname);
    }
  }
}

function fade(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function() {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 50);
}

function unfade(element) {
  var op = 0.1; // initial opacity
  element.style.display = "block";
  var timer = setInterval(function() {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}

function clearError() {
  const divErrorContainer = document.getElementById("containerOfError");
  fade(divErrorContainer);
}

function btnClicked() {
  username = document.getElementById("usernameInput").value;
  if (username != "") {
    searchUser(username);
  } else {
  }
}

function searchUser(username) {
  requestSearchUser = new XMLHttpRequest();
  requestSearchUser.onload = userInfoToHtml;
  requestSearchUser.open(
    "get",
    `https://api.github.com/users/${username}`,
    true
  );
  requestSearchUser.send();
}

// var iets;
// function getUserEvents(username) {
//   let userEvents;
//   userEvents = new XMLHttpRequest();
//   // userEvents.onload;
//   userEvents.open(
//     "get",
//     `https://api.github.com/users/${username}/events`,
//     true
//   );
//   userEvents.send();
//   // iets = JSON.parse(userEvents.responseText);
// }
function formatDate(date) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}

function createTimeline(username) {
  request = new XMLHttpRequest();
  request.onload = reposTimelineToHtml;
  request.open("get", `https://api.github.com/users/${username}/repos`, true);
  request.send();
}

function reposTimelineToHtml() {
  let reposObj = JSON.parse(this.responseText);
  reposObj.sort(function(a, b) {
    a = new Date(a.created_at);
    b = new Date(b.created_at);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  const timeline = document.getElementById("timeline");

  timeline.innerHTML = "";
  leftRight = ["r", "l"];
  for (let i = 0; i < reposObj.length; i++) {
    const liElem = document.createElement("li");
    timeline.appendChild(liElem);

    const divDir = document.createElement("li");
    divDir.setAttribute("class", `direction-${leftRight[i % 2]}`);
    liElem.appendChild(divDir);

    //first part
    const divFlagWrapper = document.createElement("div");
    divFlagWrapper.setAttribute("class", "flag-wrapper");
    divDir.appendChild(divFlagWrapper);

    const spanFlag = document.createElement("span");
    spanFlag.setAttribute("class", "flag");
    const name = reposObj[i].full_name.split("/")[1];
    const textspanFlag = document.createTextNode(`${name}`);
    spanFlag.appendChild(textspanFlag);
    divFlagWrapper.appendChild(spanFlag);

    const spanTimeWrapper = document.createElement("span");
    spanTimeWrapper.setAttribute("class", "time-wrapper");
    divFlagWrapper.appendChild(spanTimeWrapper);

    const spanTime = document.createElement("span");
    spanTime.setAttribute("class", "time");
    spanTimeWrapper.appendChild(spanTime);

    const timeFrom = new Date(reposObj[i].created_at);
    const textSpanTimeWrapper = document.createTextNode(
      `${formatDate(timeFrom)}`
    ); // - dateTo
    spanTime.appendChild(textSpanTimeWrapper);

    // //second part
    const divDesc = document.createElement("div");
    divDesc.setAttribute("class", "desc");
    divDir.appendChild(divDesc);

    const textDesc = document.createTextNode(
      "description of repo with some links to the repo and other stuff"
    );
    divDesc.appendChild(textDesc);
  }
}

init = () => {};

document.getElementById("btnSearch").addEventListener("click", btnClicked);
document
  .getElementById("usernameInput")
  .addEventListener("keypress", enterPress);
function enterPress(event) {
  if (event.keyCode == 13) {
    btnClicked();
  }
}

window.onload = function() {
  init();
  this.searchUser("reeveng");
  var user;
};
