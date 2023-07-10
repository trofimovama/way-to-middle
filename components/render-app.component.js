import { renderTodoList } from './render-todo-list.component.js';
import { rootState, notifyStateUpdated } from '../state/root.state.js';

export const rootContainer = document.getElementById("container");

export const renderApp = (appState) => {
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
    const newListData = {title: '', items: []};
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
