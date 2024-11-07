import { todoStore } from "../todo-store.js";
import "./todo-button.js";

class TodoTask extends HTMLElement {
  static get observedAttributes() {
    return ["label", "done", "id"];
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.updateTodoFromAttributes(); // Initialise `this.todo`
    this.render();
  }

  attributeChangedCallback() {
    this.updateTodoFromAttributes();
    this.render();
  }

  updateTodoFromAttributes() {
    this.todo = {
      label: this.getAttribute("label"),
      done: this.getAttribute("done") === "true",
      id: this.getAttribute("id"),
    };
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /* HTML */ `
      <style>
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
      </style>
      <div>
        <form>
          <label>
            <input type="checkbox" ${this.todo.done ? "checked" : ""} />
            <span>${this.todo.label}</span>
          </label>
        </form>
        <div>
          <todo-button action="delete"></todo-button>
          <todo-button action="edit"></todo-button>
        </div>
      </div>
    `;

    this.$checkbox = this.shadowRoot.querySelector("input[type='checkbox']");
    this.$checkbox.addEventListener("change", () => {
      todoStore.checkTodo(this.todo.id);
    });

    // Bouton "Delete"
    const deleteButton = this.shadowRoot.querySelector(
      "todo-button[action='delete']"
    );
    deleteButton.addEventListener("button-action", () => {
      todoStore.deleteTodo(this.todo.id);
      this.remove();
    });

    // Bouton "Edit"
    const editButton = this.shadowRoot.querySelector(
      "todo-button[action='edit']"
    );
    editButton.addEventListener("button-action", () => {
      this.editTask();
    });
  }

  editTask() {
    const newLabel = prompt("Modifier la tâche", this.todo.label);
    if (newLabel !== null) {
      todoStore.editTodo(this.todo.id, newLabel);
    }
  }
}

customElements.define("todo-task", TodoTask);
