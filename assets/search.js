// global variables
let resultsEl = document.querySelector("#right-results");
let formReturnBtnEl = document.querySelector("#form-return-btn");
let queryParams = "";
let requestUrl = `https://www.loc.gov/`;

// functions
function fetchApi() {
  queryParams = parseQueryParams(document.location.search);
  console.log(queryParams);

  if (queryParams) {
    requestUrl = `${requestUrl}${queryParams["format"]}/?fo=json&at=results&q=${queryParams["search"]}`;
  } else {
    requestUrl = `${requestUrl}search/?fo=json&at=results&q=${queryParams["search"]}`;
  }

  //   console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error(Error);
    })
    .then((data) => {
      populateSearch(data);
    })
    .catch((error) => {
      alert(error);
    });
}

function populateSearch(data) {
  while (resultsEl.firstChild) {
    resultsEl.removeChild(resultsEl.firstChild);
  }

  let resultsTitleEl = document.createElement("h1");
  resultsTitleEl.textContent = `Showing results for: ${queryParams["search"]}`;
  resultsTitleEl.setAttribute("style", "color: #C4CED4");
  resultsEl.append(resultsTitleEl);

  for (let i = 0; i < data.results.length; i++) {
    let cardEl = document.createElement("div");
    let cardTitleEl = document.createElement("h4");
    let cardDateEl = document.createElement("p");
    let cardSubjectEl = document.createElement("p");
    let cardDescEl = document.createElement("p");
    let btnDivEl = document.createElement("div");
    let cardBtnEl = document.createElement("button");
    let showLessEl = document.createElement("button");
    let visitSiteEl = document.createElement("button");

    cardTitleEl.textContent = data.results[i].title;
    cardDateEl.textContent = `Date: ${data.results[i].date}`;
    cardSubjectEl.textContent = `Subject: ${getSubString(data.results[i].subject + "")}`;
    cardDescEl.textContent = `Description: ${getSubString(data.results[i].description + "")}`;
    cardBtnEl.textContent = "Read More";
    showLessEl.textContent = "Read Less";
    visitSiteEl.textContent = "Visit Page";

    cardEl.setAttribute("class", "contaner m-2 p-4");
    cardEl.setAttribute("style", "background-color: #C4CED4");
    btnDivEl.setAttribute("class", "d-flex flex-row");
    cardBtnEl.setAttribute("class", "btn btn-dark");
    showLessEl.setAttribute("class", "btn btn-danger d-none");
    visitSiteEl.setAttribute("class", "btn btn-success m-2 d-none");

    cardBtnEl.addEventListener("click", function () {
      cardSubjectEl.textContent = `Subject: ${data.results[i].subject}`;
      cardDescEl.textContent = `Description: ${data.results[i].description}`;
      cardBtnEl.setAttribute("class", "d-none");
      showLessEl.setAttribute("class", "btn btn-danger d-inline");
      visitSiteEl.setAttribute("class", "btn btn-success m-2 d-inline");
    });

    showLessEl.addEventListener("click", function () {
      cardSubjectEl.textContent = `Subject: ${getSubString(data.results[i].subject + "")}`;
      cardDescEl.textContent = `Description: ${getSubString(data.results[i].description + "")}`;
      cardBtnEl.setAttribute("class", "btn btn-dark d-inline");
      showLessEl.setAttribute("class", "d-none");
      visitSiteEl.setAttribute("class", "d-none");
    });

    visitSiteEl.addEventListener("click", function () {
      window.open(data.results[i].aka[0], "_blank");
    });

    btnDivEl.append(cardBtnEl, showLessEl, visitSiteEl);
    cardEl.append(cardTitleEl, cardDateEl, cardSubjectEl, cardDescEl, cardBtnEl, showLessEl, visitSiteEl);
    resultsEl.append(cardEl);
  }
}

function showSubString(str) {}

function getSubString(str) {
  let tempStr = str;
  if (tempStr) {
    if (tempStr.length > 100) return tempStr.substring(0, 100) + "...";
    else return tempStr.substring(0, tempStr.length);
  }
  return "N/A";
}

function parseQueryParams(url) {
  let params = {};
  let queryString = url.split("?")[1];

  if (queryString) {
    let keyValuePairs = queryString.split("&");

    for (let i = 0; i < keyValuePairs.length; i++) {
      let [key, value] = keyValuePairs[i].split("=");
      params[key] = value || "";
      if (key === "format" && value === "") params[key] = "search";
    }
  }

  return params;
}
// event handlers
formReturnBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  document.location.replace(`index.html`);
});

// function calls
fetchApi();
