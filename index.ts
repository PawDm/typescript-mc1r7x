// Import stylesheets
import './style.css';

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

type Item = {
  id: number;
  parent: number | string;
  type?: string | null;
};

class TreeStore {
  items: Item[];
  constructor(items: Item[]) {
    this.items = items;
  }

  getAll = (): Item[] => this.items;

  getItem = (id: number): Item => this.items.find((item) => item.id === id);

  getChildren = (id: number): Item[] =>
    this.items.filter((item) => item.parent === id);

  getAllChildren = (id: number): Item[] => {
    const result = [];
    result.push(...this.getChildren(id));
    result.forEach((child) => {
      result.push(...this.getAllChildren(child.id));
    });
    return result;
  };

  private getParent = (id) =>
    this.items.find(
      (item) => item.id === this.items.find((item) => item.id === id).parent
    );

  getAllParents = (id) => {
    const result = [];
    const parent = this.getParent(id);
    if (parent) {
      result.push(parent);
      result.push(...this.getAllParents(parent.id));
    }
    return result;
  };
}

const ts = new TreeStore(items);

console.log('getAll() result:', ts.getAll());
console.log('getItem(7) result:', ts.getItem(7))
console.log('getChildren(4) result:', ts.getChildren(4))
console.log('getChildren(5) result:', ts.getChildren(5))
console.log('getChildren(2) result:', ts.getChildren(2))
console.log('getAllChildren(2) result:', ts.getAllChildren(2))
console.log('getAllParents(7) result:', ts.getAllParents(7));

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
