export function deleteLead(index, ...arr) {
  const [myLeads] = arr;
  myLeads.splice(index, 1);
  return myLeads;
}

export function renderMyleads(...arr) {
  const [myLeads] = arr;
  const markup = (el, id) => `
        <li>
        <i class="fas fa-minus-circle delete" data-id="${id}"></i>
        <a href=${el} target="_blank">${el}</a>
        </li>
        `;
  const elem = document.querySelector(`#ul-el`);
  elem.innerHTML = "";
  myLeads?.forEach((el, id) =>
    elem.insertAdjacentHTML("beforeend", markup(el, id))
  );
  window.localStorage.setItem("myLeads", JSON.stringify(myLeads));
}

export function saveLead(url = false, ...arr) {
  const inputEl = document.querySelector(`#input-el`);
  const [myLeads] = arr;
  // console.log(typeof myLeads);
  if (inputEl.value && !myLeads.includes(inputEl.value)) {
    myLeads.push(inputEl.value);
    inputEl.value = "";
  } else if (url && !myLeads.includes(url)) {
    // console.log(url);
    // console.log(myLeads);
    myLeads.push(url);
  } else if (inputEl.value === "") {
    console.error("The input is missing!".toUpperCase());
    alert("The input is missing!".toUpperCase());
  } else {
    console.error("Already registered this input".toUpperCase());
    alert("Already registered this input!".toUpperCase());
  }
  // console.log("Storage:", myLeads);
  renderMyleads(myLeads);
}
