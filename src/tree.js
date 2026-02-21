import { getCurrentDesk } from "./helperFunctions";
// Got to admit i was very too lazy building this myself.
// It s not the fun part !! 
// Fun part was building all architecture from scratch
// Anyway thanks to chat gpt we now have a visual =D


export function displayTree() {
  let currentDesk = getCurrentDesk();

  function buildTree(items, prefix = '') {
      let result = '';
      items.forEach((item, index) => {
          let isLast = index === items.length - 1;
          let connector = isLast ? '└── ' : '├── ';
          let icon = item.type === 'folder' ? '📁' : '📄';
          result += prefix + connector + icon + ' ' + item.name + '\n';
          if(item.type === 'folder' && item.children && item.children.length > 0){
              let newPrefix = prefix + (isLast ? '    ' : '│   ');
              result += buildTree(item.children, newPrefix);
          }
      });
      return result;
  }

  let tree = '🖥️ ' + currentDesk.name + '\n';
  tree += buildTree(currentDesk.content);

  let display = document.createElement('div');
  display.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1e1e1e;
      color: #d4d4d4;
      border: 2px solid #5b7ae5;
      border-radius: 8px;
      padding: 24px;
      z-index: 9999;
      max-height: 80vh;
      max-width: 80vw;
      overflow: auto;
  `;

  let closeBtn = document.createElement('button');
  closeBtn.textContent = '❌ Close';
  closeBtn.style.marginBottom = '12px';
  closeBtn.addEventListener('click', () => display.remove());

  let pre = document.createElement('pre');
  pre.style.margin = '0';
  pre.style.fontFamily = 'monospace';
  pre.textContent = tree; // ✅ String goes here!

  display.appendChild(closeBtn);
  display.appendChild(pre); // ✅ Then append pre!
  document.body.appendChild(display);
}
