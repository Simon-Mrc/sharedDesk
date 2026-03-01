import './style/style.css';
import { state } from './constJS/exportConst.js';
import { getAllItemFromDesk } from './queriesDb/accessQueries.js';

export async function displayTree() {

  let treeEx = document.querySelector(".existingTree");
  if (treeEx) treeEx.remove();

  function buildTree(items, parentId = null, prefix = '') {
      let result = '';
      let children = items.filter(item => String(item.parentId) === String(parentId));
      children.forEach((item, index) => {
          let isLast = index === children.length - 1;
          let connector = isLast ? '└── ' : '├── ';
          let icon = item.type === 'folder' ? '📁' : '📄';
          result += prefix + connector + icon + ' ' + item.name + '\n';
          if(item.type === 'folder'){
              let newPrefix = prefix + (isLast ? '    ' : '│   ');
              result += buildTree(items, item.id, newPrefix);
          }
      });
      return result;
  }

  // fetch items from DB!
  let items = [];
  try{
    items = await getAllItemFromDesk(state.currentDesk.id) || [];
  }catch(e){
    items = [];
  }

  let treeText = '🖥️ ' + state.currentDesk?.name + '\n';
  treeText += buildTree(items, null);
  //          ↑ pass null for root level items!

  let display = document.createElement('div');
  display.style.cssText = `
  position: fixed;
  top: 16px;
  right: 16px;
  background: #1e1e1e;
  color: #d4d4d4;
  border: 2px solid #5b7ae5;
  border-radius: 8px;
  padding: 24px;
  z-index: 9999;
  max-height: 30vh;
  max-width: 30vw;
  overflow: auto;
`;
  display.classList.add("existingTree");

  let closeBtn = document.createElement('button');
  closeBtn.textContent = '❌ Close';
  closeBtn.style.marginBottom = '12px';
  closeBtn.addEventListener('click', () => display.remove());

  let pre = document.createElement('pre');
  pre.style.margin = '0';
  pre.style.fontFamily = 'monospace';
  pre.textContent = treeText;

  display.appendChild(closeBtn);
  display.appendChild(pre);
  document.body.appendChild(display);
}