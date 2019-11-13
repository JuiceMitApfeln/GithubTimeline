class User {
  constructor(
    _name,
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
      this._name = "User doesn't exist";
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

function repoToHtml() {
  let userObj = JSON.parse(this.responseText);

  user = new User(
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

  console.log(user);
  document.createElement;
  console.log(userObj);
}

function btnClicked() {
  username = document.getElementById("usernameInput").value;
  if (username != "") {
    searchUser(username);
  } else {
  }
}

function searchUser(username) {
  let request = new XMLHttpRequest();
  request.onload = repoToHtml;
  request.open("get", `https://api.github.com/users/${username}`, true);
  request.send();
}

init = () => {
  console.log("");
};

document.getElementById("btnSearch").addEventListener("click", btnClicked);

window.onload = function() {
  init();
  this.searchUser("reeveng");
  var user;
};
