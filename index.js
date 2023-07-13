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

import { rootState, restoreState } from './state/root.state';
import { renderApp } from './components/render-app.component';

renderApp(rootState);
restoreState();
