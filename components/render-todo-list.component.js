import { renderTodoListItem } from './render-todo-list-item.component.js';
import { notifyStateUpdated } from '../state/root.state.js';
import { renderTemplate } from '../utils/render-template.js';

export const renderTodoList = (todoListState, onDestroy) => {

  const fragment = renderTemplate(
    `
    <div class='list-app'>
      <p class='delete-list-icon'>✖</p>
      <h1 class='list-title'>Plans</h1>
      <div class='list-item'>
        <input type='text' placeholder='Add something...' class='input' />
        <button class='button'>Add</button>
      </div>
      <ul class='list-container'></ul>
    </div>
  `
  );
  const cardContainer = fragment.querySelector('.list-app');
  const listContainer = fragment.querySelector('.list-container');
  const inputField = fragment.querySelector('.input');
  const listButton = fragment.querySelector('.button');
  const deleteCardIcon = fragment.querySelector('.delete-list-icon');

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
    elem: fragment
  };
};
