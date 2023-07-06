import { renderTodoListItem } from './render-todo-list-item.component.js';
import { notifyStateUpdated } from '../state/root.state.js';
import { renderTemplate } from '../utils/render-template.js';


// TODO: ?? add renderTodoListTitle file to implement new data str-re??
export const renderTodoList = (todoListState, onDestroy) => {

  const fragment = renderTemplate(`
    <div class="list-app">
      <div class="card-header">
        <input type="text" class="input-title" placeholder="Type list title..." />
        <img class="add-list-title-icon" src="../icons/add-item-dark.svg" />
        <img class="edit-list-title-icon" src="../icons/pencil.svg" />
        <img class="expand-icon" src="../icons/expand.svg" />
        <img class="downsize-icon" src="../icons/downsize.svg" />
      </div>
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
  const editCard = fragment.querySelector('.edit-list-title-icon');

  const todoListItemElems = todoListState
    .map((todoListItemData) => renderTodoListItem(todoListItemData, () => {
      const i = todoListState.indexOf(todoListItemElems);
      todoListState.splice(i, 1);

      notifyStateUpdated();
    }))
    .map(({ elem }) => elem);

  listContainer.append(...todoListItemElems);

  // TODO: to remove event Listener when data str-re implemented
  // TODO: to explore other way of adding html variable in DOM or this solution can "live"
  expandCard.addEventListener('click', () => {
    cardContainer.style.position = "absolute";
    cardContainer.style.zIndex = "10";
    cardContainer.style.top = "10%";
    cardContainer.style.right = "40%";
    downsizeCard.style.display = "block";
    expandCard.style.display = "none";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    cardContainer.style.backgroundColor = "white";
    cardContainer.style.height = "70%";
    expandable.remove();
    listContainer.style.maxHeight = "70%";
    listContainer.style.overflow = "auto";
    cardContainer.style.width = "400px";
    cardContainer.style.boxShadow = "none";
  });

  // TODO: tip needed, seems like "костыльное решение"??
  // TODO: remove listener it after correct implementation
  downsizeCard.addEventListener('click', () => {
    window.location.reload();
  })

  // TODO: to remove event Listener when data str-re implemented
  listTitleIcon.addEventListener('click', () => {
    const objTitle = {title: inputTitleField.value};
    inputTitleField.style.color = "black";
    inputTitleField.style.fontWeight = "bold";
    inputTitleField.style.textAlign = "center";
    editCard.style.display = "block";
    listTitleIcon.style.display = "none";
    // todoListState.push(objTitle);
    // notifyStateUpdated();
  });

  // TODO: remove this event Listener after appr-l
  editCard.addEventListener('click', () => {
    inputTitleField.focus();
    listTitleIcon.style.display = "block";
    editCard.style.display = "none";
  });

  const createNewTodoItem = () => {
    if (!inputField.value) {
      inputField.removeEventListener('keydown',  createNewTodoItem);
      return;
    };

    // TODO: working, but stops after page regresh, to fix
    if (todoListState.length > 5) {
      expandable.style.display = "block";
    } else {
      expandable.style.display = "none";
    };

    // TODO: to implement new data structure (tip required);
    // const newTodoItemData = {items: [{ text: inputField.value, isDone: false }]};
    const newTodoItemData = { text: inputField.value, isDone: false };
 
    todoListState.push(newTodoItemData)

    
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
