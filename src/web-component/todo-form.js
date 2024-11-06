import { todoStore } from "../todo-store.js";
import "./todo-button.js";

class TodoForm extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  disconnectedCallback() {}

  render() {
    this.shadowRoot.innerHTML = /* HTML */ `
      <form>
        <label> Tâche : </label>
        <input name="label" required />
        <todo-button action="add"></todo-button>
      </form>
    `;

    this.$form = this.shadowRoot.querySelector("form");
    this.$input = this.shadowRoot.querySelector("input");
    this.$todoButton = this.shadowRoot.querySelector("todo-button");

    // Écoute l'événement 'submit' sur le formulaire
    this.$form.addEventListener("submit", (event) => this.onSubmit(event));

    // Écoute l'événement personnalisé 'button-action' du bouton
    this.$todoButton.addEventListener("button-action", (event) => {
      const action = event.detail.action;
      if (action === "add") {
        todoStore.createTodo(this.$input.value);
      } else if (action === "edit") {
        // Logique pour éditer une tâche
      } else if (action === "delete") {
        // Logique pour supprimer une tâche
      }
      this.$input.value = "";
    });
  }

  // Empêche la soumission classique du formulaire et exécute l'action sur le bouton
  onSubmit(event) {
    event.preventDefault();
    // Ce qui est fait ici est déjà géré par l'événement button-action
    // Vous pouvez également gérer l'ajout ici si nécessaire, mais cela est déjà pris en charge
    todoStore.createTodo(this.$input.value);
    this.$input.value = "";
  }

  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define("todo-form", TodoForm);
