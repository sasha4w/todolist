import { todoStore } from "../todo-store.js";
import "./todo-task.js";

class TodoList extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const todos = todoStore.getTodos();

    this.shadowRoot.innerHTML = `
      <ul>
        ${todos
          .map(
            (todo) => `
            <li>
              <todo-task 
                label="${todo.label}" 
                done="${todo.done}" 
                id="${todo.id}">
              </todo-task>
            </li>`
          )
          .join("")}
      </ul>
    `;
  }
}

customElements.define("todo-list", TodoList);
