const inputField = document.getElementById('input-field');
const listContainer = document.getElementById('list-container');

// см. п. 1
const AddItemToList = () => {
  // см. п. 2
  let listItem = document.createElement('li');
  let listItemInput = document.createElement('input');
  listItemInput.setAttribute("type", "checkbox");
  let listItemLabel = document.createElement('label');

  listItemLabel.innerHTML = inputField.value;

  listContainer.appendChild(listItem);
  listItem.appendChild(listItemInput);
  listItem.appendChild(listItemLabel);

  let deleteItem = document.createElement('span');
  deleteItem.innerHTML = "☒";
  listItem.appendChild(deleteItem);

  inputField.value = "";
};

listContainer.addEventListener("click", (e) => {
  // см. п. 3 
  if(e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
  }
})