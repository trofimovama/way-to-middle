const inputField = document.getElementById('input-field');
const listContainer = document.getElementById('list-container');
const deleteItemTag = 'span';

const addItemToList = () => {
  const listItem = document.createElement('li');
  const listItemInput = document.createElement('input');
  listItemInput.setAttribute("type", "checkbox");
  const listItemLabel = document.createElement('label');

  listItemLabel.innerHTML = inputField.value;

  listContainer.appendChild(listItem);
  listItem.appendChild(listItemInput);
  listItem.appendChild(listItemLabel);

  const deleteItem = document.createElement(deleteItemTag);
  deleteItem.innerHTML = "☒";
  listItem.appendChild(deleteItem);

  inputField.value = "";
};

listContainer.addEventListener("click", (e) => {
  if(e.target.tagName.toLowerCase() === deleteItemTag) {
    e.target.parentElement.remove();
  }
})