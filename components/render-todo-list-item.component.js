import { notifyStateUpdated } from "../state/root.state.js";

export const renderTodoListItem = (todoListItemState, onDestroy) => {

  const listItem = document.createElement('li');

  const listItemInput = document.createElement('input');
  listItemInput.setAttribute("type", "checkbox");

  const listItemLabel = document.createElement('label');

  const deleteItem = document.createElement('span');
  deleteItem.innerHTML = "☒";

  listItem.append(listItemInput, listItemLabel, deleteItem);

  listItemLabel.innerHTML = todoListItemState.text;

  if(todoListItemState.isDone) {
    listItemInput.setAttribute('checked', todoListItemState.isDone);
  };

  const setIsDoneState = () => {
    todoListItemState.isDone = listItemInput.checked;
    notifyStateUpdated();
  };

  listItemInput.addEventListener('click', setIsDoneState);

  deleteItem.addEventListener('click', () => {
    listItem.remove();
    listItemInput.removeEventListener('click', setIsDoneState);
    onDestroy();
  }, { once: true });

  return {
    elem: listItem
  };
};
