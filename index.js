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


import { rootState, restoreState } from './state/root.state.js';
import { renderApp } from './components/render-app.component.js';

renderApp(rootState);
restoreState();
