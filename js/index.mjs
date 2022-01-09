import { deleteLead, renderMyleads, saveLead } from "./functions.mjs";
const btnInput = document.querySelector("#input-btn");
const btnUrl = document.querySelector("#url-btn");
const btnClear = document.querySelector("#clear-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const storageItem = window.localStorage.getItem("myLeads");
const myLeadsStorage = !(storageItem === "undefined")
  ? JSON.parse(storageItem)
  : "";
const myLeads = myLeadsStorage || [];

// function deleteLead(index) {
//   // console.log(index);
//   myLeads.splice(index, 1);
// }

// function renderMyleads() {
//   // <i class="gg-trash" data-id="${id}"></i>
//   const markup = (el, id) => `
//       <li>
//       <i class="fas fa-minus-circle delete"></i>
//       <a href=${el} target="_blank">${el}</a>
//       </li>
//       `;
//   ulEl.innerHTML = "";
//   myLeads.forEach((el, id) =>
//     ulEl.insertAdjacentHTML("beforeend", markup(el, id))
//   );
//   window.localStorage.setItem("myLeads", JSON.stringify(myLeads));
// }

// function saveLead(url = false) {
//   if (
//     (inputEl.value !== "" &&
//       inputEl.value &&
//       !myLeads.includes(inputEl.value)) ||
//     (url && !myLeads.includes(url))
//   ) {
//     myLeads.push(inputEl.value || url);
//     inputEl.value = "";
//   } else {
//     console.log("Already registered this input");
//   }
//   // console.log("Storage:", myLeads);
//   renderMyleads();
// }

// ! render Leads on local storage as soon as the application starts
if (myLeads) renderMyleads(myLeads);

// ! -------------------------------- handlers -------------------------------- //
btnInput.addEventListener("click", () => saveLead(false, myLeads));
inputEl.addEventListener("keyup", (e) =>
  e.key === "Enter" ? saveLead(false, myLeads) : false
);

btnUrl.addEventListener("click", () => {
  // saveLead(window.location.toString(), myLeads)
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    saveLead(tabs[0].url, myLeads);
  });
});

btnClear.addEventListener("click", () => {
  window.localStorage.clear();
  myLeads.splice(0, myLeads?.length);
  renderMyleads(myLeads);
});

ulEl.addEventListener("click", (e) => {
  if (e.target.className.includes("delete")) {
    const tempLeads = deleteLead(e.target.dataset.id, myLeads);
    myLeads.map((el, i) => tempLeads[i])
    console.log(myLeads);
    renderMyleads(myLeads);
  }
});
