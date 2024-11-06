import { todoStore } from "../todo-store.js";
import "./todo-button.js";

class TodoTask extends HTMLElement {
  static get observedAttributes() {
    return ["label", "done", "id"]; // Ajouter "id" si nécessaire
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    setTimeout(() => this.render(), 0); // On attend que le shadow DOM soit prêt
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const label = this.getAttribute("label");
    const done = this.getAttribute("done") === "true";
    const id = this.getAttribute("id");

    this.shadowRoot.innerHTML = /* HTML */ `
      <form>
        <label>
          <input type="checkbox" ${done ? "checked" : ""} />
          <span>${label}</span>
        </label>
      </form>
      <div>
        <todo-button action="delete"></todo-button>
        <todo-button action="edit"></todo-button>
      </div>
    `;

    this.$checkbox = this.shadowRoot.querySelector("input[type='checkbox']");
    this.$checkbox.addEventListener("change", () => {
      todoStore.checkTodo(id); // On toggle la tâche
    });

    // Gérer l'action du bouton "delete"
    const deleteButton = this.shadowRoot.querySelector(
      "todo-button[action='delete']"
    );
    deleteButton.addEventListener("button-action", () => {
      todoStore.deleteTodo(id); // On supprime la tâche par son ID
    });

    // Gérer l'action du bouton "edit"
    const editButton = this.shadowRoot.querySelector(
      "todo-button[action='edit']"
    );
    editButton.addEventListener("button-action", () => {
      this.editTask(id); // On passe à l'édition de la tâche
    });
  }

  editTask(id) {
    // Logique pour éditer une tâche, tu peux ici modifier l'interface
    // et afficher un champ de saisie pour l'édition.
    const label = this.getAttribute("label");
    const newLabel = prompt("Modifier la tâche", label); // On demande à l'utilisateur de modifier
    if (newLabel !== null) {
      todoStore.editTodo(id, newLabel); // On envoie la nouvelle valeur au store
    }
  }
}

customElements.define("todo-task", TodoTask);
