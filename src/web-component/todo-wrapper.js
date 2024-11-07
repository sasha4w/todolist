import { todoStore } from "../todo-store.js";
import "./todo-list.js";
class TodoWrapper extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();

    // Met à jour l'affichage des tâches restantes chaque fois qu'il y a un changement dans TodoStore
    todoStore.subscribe(() => {
      this.render();
    });
  }

  render() {
    const remainingTodos = todoStore.getRemainingTodos(); // Récupère le nombre de tâches restantes

    // Rendu du template HTML avec le nombre de tâches restantes
    this.shadowRoot.innerHTML = /* HTML */ `
      <style>
        .button-list {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2rem;
        }
        .button-list button {
          width: 100%;
        }
        #taskCount {
          text-align: center;
        }
      </style>
      <todo-list></todo-list>
      <div id="taskCount">Tâches restantes : ${remainingTodos}</div>
      <div class="button-list">
        <button id="taskComplete" ${remainingTodos === 0 ? "disabled" : ""}>
          Compléter tout
        </button>
        <button
          id="taskClear"
          ${!todoStore.hasCheckedTodos() ? "disabled" : ""}
        >
          Supprimer les tâches cochées
        </button>
      </div>
    `;

    // Références des éléments DOM dans le shadowRoot
    this.$taskCount = this.shadowRoot.getElementById("taskCount");
    this.$taskComplete = this.shadowRoot.getElementById("taskComplete");
    this.$taskClear = this.shadowRoot.getElementById("taskClear");

    // Écouteurs pour gérer les clics des boutons
    this.$taskComplete.addEventListener("click", () => {
      todoStore.checkAllTodo(); // Cocher toutes les tâches
    });

    this.$taskClear.addEventListener("click", () => {
      todoStore.deleteCheckedTodos(); // Supprimer les tâches cochées
    });
  }
}

customElements.define("todo-wrapper", TodoWrapper);
