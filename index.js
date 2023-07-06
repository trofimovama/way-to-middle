/**  
 * @type {{ 
*  [
*   {
*     title: string,
*     items: [
*             {
*               text: string,
*               isDone: bool
*             },
*             ...
*           ]
*   },
*   {
*     title: string,
*     items: [
*             {
*               text: string,
*               isDone: bool
*             }
*           ]
*   },
*   ...
* ] 
* }}
*/


import { rootState, restoreState } from './state/root.state.js';
import { renderApp } from './components/render-app.component.js';

renderApp(rootState);
restoreState();
