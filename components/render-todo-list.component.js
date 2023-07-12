import { renderTodoListItem } from './render-todo-list-item.component.js';
import { notifyStateUpdated } from '../state/root.state.js';
import { renderTemplate } from '../utils/render-template.js';

export const renderTodoList = (todoListState, onDestroy) => {

  const fragment = renderTemplate(`
    <div class="list-app">
      <div class="card-header">
        <input type="text" class="input-title" placeholder="Type list title..." />
        <img class="add-list-title-icon" src="../icons/add-item-dark.svg" />
        <img class="expand-icon" src="../icons/expand.svg" />
        <img class="downsize-icon" src="../icons/downsize.svg" />
      </div>
      <div class="title">${todoListState.title}</div>
      <ul class="list-container"></ul>
      <img class="expandable" src="../icons/three-dots.png" />
      <div class="input-container">
        <img class="add-list-item-icon" src="../icons/add-item-dark.svg" />
        <input type="text" class="input-item" placeholder="List item..." />
      </div>
      <img class="delete-list-card-icon" src="../icons/recycle-bin.svg" />
    </div>
  `);

  const cardContainer = fragment.querySelector('.list-app');
  const listContainer = fragment.querySelector('.list-container');
  const inputField = fragment.querySelector('.input-item');
  const listButton = fragment.querySelector('.add-list-item-icon');
  const deleteCardIcon = fragment.querySelector('.delete-list-card-icon');
  const listTitleIcon = fragment.querySelector('.add-list-title-icon');
  const inputTitleField = fragment.querySelector('.input-title');
  const expandable = fragment.querySelector('.expandable');
  const expandCard = fragment.querySelector('.expand-icon');
  const downsizeCard = fragment.querySelector('.downsize-icon');

  const todoListItemElems = todoListState['items']
    .map((todoListItemData) => renderTodoListItem(todoListItemData, () => {
      const i = todoListState['items'].indexOf(todoListItemElems);
      todoListState['items'].splice(i, 1);
      notifyStateUpdated();
    }))
    .map(({ elem }) => elem)
  listContainer.append(...todoListItemElems);

  const expandCardEvent = () => {
    cardContainer.style.position = "absolute";
    cardContainer.style.zIndex = "10";
    cardContainer.style.top = "10%";
    cardContainer.style.right = "40%";
    downsizeCard.style.display = "block";
    expandCard.style.display = "none";
    cardContainer.style.backgroundColor = "white";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    cardContainer.style.height = "70%";
    expandable.remove();
    listContainer.style.maxHeight = "70%";
    listContainer.style.overflow = "auto";
    cardContainer.style.width = "400px";
    cardContainer.style.boxShadow = "none";
  }

  const downsizeCardAction = () => {
    expandCard.removeEventListener('click', expandCardEvent);
    downsizeCard.removeEventListener('click', downsizeCardAction)
    window.location.reload();
  };

  const addTitleAction = () => {
    window.location.reload();
    listTitleIcon.style.display = "none";
    todoListState['title'] = inputTitleField.value
    notifyStateUpdated();
  };

  expandCard.addEventListener('click', expandCardEvent);

  downsizeCard.addEventListener('click', downsizeCardAction);

  listTitleIcon.addEventListener('click', addTitleAction);

  const createNewTodoItem = () => {
    if (!inputField.value) {
      inputField.removeEventListener('keydown',  createNewTodoItem);
      return;
    };

    if (todoListState.length > 5) {
      expandable.style.display = "block";
    } else {
      expandable.style.display = "none";
    };

    const newTodoItemData = { text: inputField.value, isDone: false };
    todoListState['items'].push(newTodoItemData);

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
    listTitleIcon.removeEventListener('click', addTitleAction);
    window.location.reload();
    onDestroy();
    notifyStateUpdated();
  }, { once: true });
  
  return {
    elem: fragment
  };
};
