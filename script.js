/**  
 * @type {{ 
*  items: [
  *    [
  *      { 
  *        text: String, 
  *        isDone: Boolean 
  *      }, 
  *      {
  *        text: String, 
 *         isDone: Boolean 
  *      },
  *      ...
  *    ],
  *    []
  *  ] 
  * }}
  */

const rootState = [];
const rootContainer = document.getElementById("container");

const notifyStateUpdated = () => {
  localStorage.setItem('data', rootContainer.innerHTML);
};

const displayData = () => {
  rootContainer.innerHTML = localStorage.getItem("data");
};

const renderApp = (appState) => {
  const addListsButton = document.getElementById("add-lists");

  const todoListElems = appState
  .map((todoListData) => {
    const destroyFromState = () => {
      const i = appState.indexOf(todoListData);
      appState.splice(i, 1);

      notifyStateUpdated();
    };

    const component = renderTodoList(todoListData, destroyFromState);

    return component;
  })
  .map(({ elem }) => elem);
  rootContainer.append(...todoListElems);

  addListsButton.addEventListener('click', () => {
    const newListData = [];
    rootState.push(newListData);

    const { elem } = renderTodoList(newListData, () => {
      const i = appState.indexOf(newListData);
      appState.splice(i, 1);

      notifyStateUpdated();
    });
    rootContainer.append(elem);

    notifyStateUpdated();
  });

  return {
    elem: rootContainer
  };
};

const renderTodoList = (todoListState, onDestroy) => {
  const cardContainer = document.createElement('div');
  cardContainer.setAttribute("class", "list-app");

  const deleteCardIcon = document.createElement('p');
  deleteCardIcon.innerHTML = "✖";
  deleteCardIcon.setAttribute("class", "delete-list-icon");

  const cardTitle = document.createElement('h1');
  cardTitle.setAttribute("class", "list-title");
  cardTitle.innerHTML = "Plans";

  const inputContainer = document.createElement('div');
  inputContainer.setAttribute("class", "list-item");

  const inputField = document.createElement('input');
  inputField.setAttribute("type", "text");
  inputField.setAttribute("placeholder", "Add something...");

  const listButton = document.createElement('button');
  listButton.setAttribute("class", "button");
  listButton.innerHTML = "Add";

  const listContainer = document.createElement('ul');
  listContainer.setAttribute("class", "list-container");

  cardContainer.append(deleteCardIcon, cardTitle, inputContainer, listContainer);

  inputContainer.append(inputField, listButton);

  const todoListItemElems = todoListState
    .map((todoListItemData) => renderTodoListItem(todoListItemData))
    .map(({ elem }) => elem);

  listContainer.append(...todoListItemElems);

  const createNewTodoItem = () => {
    if (!inputField.value) {
      return;
    };

    const newTodoItemData = { text: inputField.value, isDone: false };
    todoListState.push(newTodoItemData);

    const { elem } = renderTodoListItem(newTodoItemData, () => {
      const i = todoListState.indexOf(newTodoItemData);
      todoListState.splice(i, 1);

      notifyStateUpdated();
    });

    listContainer.append(elem);

    inputField.value = '';

    notifyStateUpdated();
  };

  inputField.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      createNewTodoItem();
    } 
    
    if (e.key === "Escape") {
      inputField.value = "";
    };
  });

  listButton.addEventListener('click', () => createNewTodoItem());

  deleteCardIcon.addEventListener('click', () => {
    cardContainer.remove();
    onDestroy();
  });

  return {
    elem: cardContainer
  };
};

const renderTodoListItem = (todoListItemState, onDestroy) => {
  const listItem = document.createElement('li');

  const listItemInput = document.createElement('input');
  listItemInput.setAttribute("type", "checkbox");

  const listItemLabel = document.createElement('label');

  const deleteItem = document.createElement('span');
  deleteItem.innerHTML = "☒";

  listItem.append(listItemInput, listItemLabel, deleteItem);

  listItemLabel.innerHTML = todoListItemState.text;

  listItemInput.addEventListener('click', () => {
      listItemInput.toggleAttribute('checked', todoListItemState.isDone = true);
      notifyStateUpdated();
  });

  deleteItem.addEventListener('click', (e) => {
    e.target.parentElement.remove();
    onDestroy();
    notifyStateUpdated();
  });

  return {
    elem: listItem
  };
};

renderApp(rootState);
displayData();
