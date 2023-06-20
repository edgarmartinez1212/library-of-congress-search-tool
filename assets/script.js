// global variables
let formSearchEl = document.querySelector(".form-search");
let formTextEl = document.querySelector(".form-text");
let formDropEl = document.querySelector(".form-dropdown");
let submitBtnEl = document.querySelector(".form-search-btn");

// functions
function handleFormSubmit(event) {
  // stops from refreshing page
  event.preventDefault();

  // changes page to search-results.html

  // --- starts requestUrl and adjusts to search terms and query parameters


  // logs the url (for me)
  document.location.replace(`search-results.html?search=${formTextEl.value}&format=${formDropEl.value}`);
}

// submit search query from user
// either perform generic seach for data in all formats ir select format to filter results
// see all results of search displayed on separate page
// conduct additional searches from results page

// event listeners
formSearchEl.addEventListener("submit", handleFormSubmit);
