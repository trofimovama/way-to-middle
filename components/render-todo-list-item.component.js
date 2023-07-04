import { notifyStateUpdated } from "../state/root.state.js";
import { renderTemplate } from "../utils/render-template.js";

export const renderTodoListItem = (todoListItemState, onDestroy) => {

  const fragmentItem = renderTemplate(
    `
    <li>
      <input type='checkbox' class='checkbox'/>
        <label>${todoListItemState.text}</label>
      <span>☒</span>
    </li>
  `
  );

  const listItemInput = fragmentItem.querySelector('.checkbox');
  const deleteItem = fragmentItem.querySelector('span');
  const listItem = fragmentItem.querySelector('li');

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
    elem: fragmentItem
  };
};
