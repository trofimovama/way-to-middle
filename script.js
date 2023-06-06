const inputField = document.getElementById('input-field');
const listContainer = document.getElementById('list-container');
const deleteItemTag = 'span';
const inputItemTag = 'input';

const storeData = () => {
  localStorage.setItem("data", listContainer.innerHTML);
};

const displayData = () => {
  listContainer.innerHTML = localStorage.getItem("data");
};

const addItemToList = () => {
  const listItem = document.createElement('li');
  const listItemInput = document.createElement(inputItemTag);
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
  storeData();
};

listContainer.addEventListener("click", (e) => {
  if(e.target.tagName.toLowerCase() === deleteItemTag) {
    e.target.parentElement.remove();
  } else if (e.target.tagName.toLowerCase() === inputItemTag) {
    e.target.toggleAttribute('checked');
  }
  storeData();
});

inputField.addEventListener("keydown", (e) => {
  if (inputField.value) {
    if (e.key === "Enter") {
      addItemToList();
    } else if (e.key === "Escape") {
      inputField.value = "";
    }
  };
});

displayData();
