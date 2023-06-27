import { renderTodoListItem } from './render-todo-list-item.component.js';
import { notifyStateUpdated } from '../state/root.state.js';

export const renderTodoList = (todoListState, onDestroy) => {
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
    .map((todoListItemData) => renderTodoListItem(todoListItemData, () => {
      const i = todoListState.indexOf(todoListItemElems);
      todoListState.splice(i, 1);

      notifyStateUpdated();
    }))
    .map(({ elem }) => elem);

  listContainer.append(...todoListItemElems);

  const createNewTodoItem = () => {
    if (!inputField.value) {
      inputField.removeEventListener('keydown',  createNewTodoItem);
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

  const cleanField = () => inputField.value = "";

  const inputActions = (e) => {
    if (e.key === "Enter") {
      createNewTodoItem();
    }
    if (e.key === "Escape") {
      cleanField();
    };
  }

  inputField.addEventListener('keydown', inputActions);

  listButton.addEventListener('click', createNewTodoItem);

  deleteCardIcon.addEventListener('click', () => {
    cardContainer.remove();
    inputField.removeEventListener('keydown', inputActions);
    listButton.removeEventListener('click', createNewTodoItem);
    onDestroy();
  }, { once: true });
  
  return {
    elem: cardContainer
  };
};
