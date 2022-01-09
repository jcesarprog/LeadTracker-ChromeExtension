import { deleteLead, renderMyleads, saveLead } from "./functions.mjs";

const btnInput = document.querySelector("#input-btn");
const btnUrl = document.querySelector("#url-btn");
const btnClear = document.querySelector("#clear-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");

// ! render Leads from local storage as soon as the application starts if it exists
const storageItem = window.localStorage.getItem("myLeads");
const myLeadsStorage = !(storageItem === "undefined")
  ? JSON.parse(storageItem)
  : "";
const myLeads = myLeadsStorage || [];

if (myLeads) renderMyleads(myLeads);

// ! -------------------------------- handlers -------------------------------- //
btnInput.addEventListener("click", () => saveLead(false, myLeads));
inputEl.addEventListener("keyup", (e) =>
  e.key === "Enter" ? saveLead(false, myLeads) : false
);

btnUrl.addEventListener("click", () => {
  if (!chrome?.tabs) saveLead(window.location.toString(), myLeads);
  else {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      saveLead(tabs[0].url, myLeads);
    });
  }
});

btnClear.addEventListener("click", () => {
  window.localStorage.clear();
  myLeads.splice(0, myLeads?.length);
  renderMyleads(myLeads);
});

ulEl.addEventListener("click", (e) => {
  if (e.target.className.includes("delete")) {
    const tempLeads = deleteLead(e.target.dataset.id, myLeads);
    myLeads.map((el, i) => tempLeads[i]);
    // console.log(myLeads);
    renderMyleads(myLeads);
  }
});
