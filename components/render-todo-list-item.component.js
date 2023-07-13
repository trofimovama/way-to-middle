import { notifyStateUpdated } from '../state/root.state';
import { renderTemplate } from '../utils/render-template';

export const renderTodoListItem = (todoListItemState, onDestroy) => {
  const fragmentItem = renderTemplate(`
    <li class="list-row">
      <input type="checkbox" class="checkbox"/>
      <label class="list-item-content">${todoListItemState.text}</label>
      <img class="delete-list-item" src="../icons/delete-list-item.svg" />
    </li>
  `);

  const listItemInput = fragmentItem.querySelector('.checkbox');
  const deleteItem = fragmentItem.querySelector('.delete-list-item');
  const listItem = fragmentItem.querySelector('li');

  if (todoListItemState.isDone) {
    listItemInput.setAttribute('checked', todoListItemState.isDone);
  }

  const setIsDoneState = () => {
    // eslint-disable-next-line no-param-reassign
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
    elem: fragmentItem,
  };
};
