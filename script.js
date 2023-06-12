const container = document.getElementById("container");
const id = Date. now();

const addToListButton = document.getElementById('add-lists');
const deleteItemTag = 'span';
const inputItemTag = 'input';

const saveData = () => {
  localStorage.setItem('data', container.innerHTML);
};

const displayData = () => {
  container.innerHTML = localStorage.getItem("data");
};

const addCardContainer = () => {

  const addListItem = () => {
    const listItem = document.createElement('li');
  
      const listItemInput = document.createElement(inputItemTag);
      listItemInput.setAttribute("type", "checkbox");

      const listItemLabel = document.createElement('label');
      listItemLabel.innerHTML = inputField.value;

      const deleteItem = document.createElement(deleteItemTag);
      deleteItem.innerHTML = "☒";

      listContainer.appendChild(listItem);

      listItem.append(listItemInput, listItemLabel, deleteItem);

      inputField.value = "";
      saveData();
  };

  const cardContainer = document.createElement('div');
  cardContainer.setAttribute("class", "list-app");

  const deleteCardIcon = document.createElement('p');
  deleteCardIcon.innerHTML = "✖";
  deleteCardIcon.setAttribute("class", "delete-list-icon");
  deleteCardIcon.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "p") {
      e.target.parentElement.remove();
      saveData();
    };
  });

  const cardTitle = document.createElement('h1');
  cardTitle.setAttribute("class", "list-title");
  cardTitle.innerHTML = "Plans";

  const inputContainer = document.createElement('div');
  inputContainer.setAttribute("class", "list-item");

  const inputField = document.createElement('input');
  inputField.setAttribute("type", "text");
  inputField.setAttribute("id", id);
  inputField.setAttribute("placeholder", "Add something...");
  inputField.addEventListener("keydown", (e) => {
    if (inputField.value) {
      if (e.key === "Enter") {
        addListItem();
      } else if (e.key === "Escape") {
        inputField.value = "";
      }
      saveData();
    };
  });

  const listButton = document.createElement('button');
  listButton.setAttribute("class", "button");
  listButton.innerHTML = "Add";
  listButton.addEventListener("click", () => {
    if (inputField.value) {
      addListItem();
    };
  });

  const listContainer = document.createElement('ul');
  listContainer.setAttribute("class", "list-container");

  container.appendChild(cardContainer);

  cardContainer.append(deleteCardIcon, cardTitle, inputContainer, listContainer);
  
  inputContainer.append(inputField, listButton);

  listContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === deleteItemTag) {
      e.target.parentElement.remove();
    } else if (e.target.tagName.toLowerCase() === inputItemTag) {
      e.target.toggleAttribute('checked');
    };
    saveData();
  });
};

addToListButton.addEventListener ("click", () => {
  addCardContainer();
});

displayData();
