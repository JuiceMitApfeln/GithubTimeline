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
      this._name = "";
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
  if (obj == undefined) {
    return false;
  }
  if (typeof obj == "string") return obj.trim() != "";
  return true;
}

function userInfoToHtml(userObj) {
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
  new Text(formatLink(user.blog)).createText(alink);
  div2.appendChild(alink);
  bio.appendChild(div2);
  document.createElement;

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";
  if (user.publicRepos > 0) {
    getReposThanCreateTimeline(user.nickname).then(repos => {
      reposTimelineToHtml(repos);
    });
    // getUserEvents(user.nickname, page);
  }
  // }
}

function formatLink(link) {
  if (link.substring(0, 8) == "https://") {
    return link.replace("https://", "");
  }
  if (link.substring(0, 3) == "www") {
    return link.replace("www", "");
  }
  if (link.substring(0, 7) == "http://") {
    return link.replace("http://", "");
  }
  return link;
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
  reposList = [];
  if (username != "") {
    searchUser(username)
      .then(user => {
        userInfoToHtml(user);
      })
      .catch(e => displayErrorMsg(`${e.message}`, true));
  }
}

async function searchUser(username) {
  let response = await fetch(`https://api.github.com/users/${username}`);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw new Error(`User doesn't exist.`);
  }
}

async function getUserEvents(username, pageNr) {
  // not yet implemented
  let response = await fetch(
    `https://api.github.com/users/${username}/events?page=${pageNr}&per_page=100`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw new Error(`User has no events.`);
  }
}

async function getContributorsOfRepo(link) {
  let response = await fetch(`${link}`);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw new Error(`No contributors found`);
  }
}

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

async function getReposThanCreateTimeline(username) {
  let response = await fetch(
    `https://api.github.com/users/${username}/repos?page=1&per_page=100`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw new Error(`User has no repositories.`);
  }
}

async function getReposThanCreateTimelineMoreThan100Repos(username, pageNr) {
  let response = await fetch(
    `https://api.github.com/users/${username}/repos?page=${pageNr}&per_page=100`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw new Error(`User has no repositories.`);
  }
}

var invoked;
function displayErrorMsg(msg, fadeInAndOut = false) {
  if (!invoked) {
    invoked = true;
    const divErrorContainer = document.getElementById("containerOfError");
    divErrorContainer.innerHTML = "";
    if (fadeInAndOut) {
      unfade(divErrorContainer);
    }
    const divError = document.createElement("div");
    divError.setAttribute("class", "error");
    divErrorContainer.appendChild(divError);

    divError.appendChild(document.createTextNode(`${msg}`));

    window.setTimeout(clearError, 3000);
    invoked = false;
  }
}

let reposList = [];
pageNrRem = 2;
function reposTimelineToHtml(reposObj) {
  if (reposObj.length >= 100) {
    displayErrorMsg("This might take a few seconds");

    reposList.push(...reposObj);
    getReposThanCreateTimelineMoreThan100Repos(
      reposObj[0].owner.login,
      pageNrRem
    ).then(repos => reposTimelineToHtml(repos));
    pageNrRem++;
  } else {
    reposObj.push(...reposList);
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

      const divDir = document.createElement("div");
      divDir.setAttribute("class", `direction-${leftRight[i % 2]}`);
      liElem.appendChild(divDir);

      //first part
      const divFlagWrapper = document.createElement("div");
      divFlagWrapper.setAttribute("class", "flag-wrapper");
      divDir.appendChild(divFlagWrapper);

      const spanFlag = document.createElement("span");
      spanFlag.setAttribute("class", "flag");
      const textspanFlag = document.createTextNode(`${reposObj[i].name}`);
      spanFlag.appendChild(textspanFlag);
      divFlagWrapper.appendChild(spanFlag);

      const spanTimeWrapper = document.createElement("span");
      spanTimeWrapper.setAttribute("class", "time-wrapper");
      divFlagWrapper.appendChild(spanTimeWrapper);

      const spanTime = document.createElement("span");
      spanTime.setAttribute("class", "time");
      spanTimeWrapper.appendChild(spanTime);

      const textSpanTimeWrapper = document.createTextNode(
        `${formatDate(new Date(reposObj[i].created_at))}`
      ); // - dateTo
      spanTime.appendChild(textSpanTimeWrapper);

      // //second part
      const divDesc = document.createElement("div");
      divDesc.setAttribute("class", "desc");
      divDesc.setAttribute("id", `desc${i}`);
      divDir.appendChild(divDesc);

      const linkToRepo = document.createElement("a");
      linkToRepo.setAttribute("href", `${reposObj[i].html_url}`);
      const textLink = document.createTextNode(
        `${formatLink(reposObj[i].html_url)}`
      );
      linkToRepo.append(textLink);
      divDesc.append(linkToRepo);

      divDesc.appendChild(document.createElement("br"));
      const textDesc = document.createTextNode(
        `last update on: ${formatDate(new Date(reposObj[i].updated_at))}`
      );
      // if (reposObj.length < 100) {
      getContributorsOfRepo(reposObj[i].contributors_url)
        .then(contributors => {
          contributorsToHtml(contributors, reposObj[i].owner.login, i);
        })
        .catch(function noContributors() {
          divDesc.appendChild(document.createElement("br"));
          divDesc.appendChild(
            document.createTextNode(`No contributions available.`)
          );
        });
      // } else {
      //   displayErrorMsg(
      //     "Only a part of the information will be provided due to the considerable amount of repositories."
      //   );
      // }
      divDesc.appendChild(textDesc);
    }
  }
}
let totalContributionForUser = 0;
function contributorsToHtml(contributors, username, i) {
  const desc = document.getElementById(`desc${i}`);
  desc.appendChild(document.createElement("br"));
  let totalContributionRepository = 0;
  contributors.forEach(contributor => {
    totalContributionRepository += contributor.contributions;
    if (contributor.login == username) {
      totalContributionForUser += contributor.contributions;
      desc.appendChild(
        document.createTextNode(
          `Contributions by ${username}: ${contributor.contributions}`
        )
      );
    }
  });
  desc.appendChild(
    document.createTextNode(` of ${totalContributionRepository}`)
  );
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
  searchUser("reeveng")
    .then(user => {
      console.log(user);
      userInfoToHtml(user);
    })
    .catch(e => {
      displayErrorMsg(`User ${e.message}`, true);
      console.log(e);
    });
};
