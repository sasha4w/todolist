import { todoStore } from "../todo-store.js";
import "./todo-task.js";

class TodoList extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render(); // Rendu initial
    this.unsubscribe = todoStore.subscribe(() => this.render()); // Mise à jour à chaque modification du store
  }

  render() {
    const todos = todoStore.getTodos();

    // On cherche ou crée un <style> pour styliser le <ul>
    if (!this.shadowRoot.querySelector("style")) {
      const style = document.createElement("style");
      style.textContent = `
      
        ul {
          list-style: none; /* Retire les puces de la liste */
          padding: 0; /* Retire le padding par défaut */
          margin: 0; /* Retire la marge par défaut */
        }
      `;
      this.shadowRoot.appendChild(style);
    }

    // On cherche ou crée un <ul> dans le shadow DOM
    let ul = this.shadowRoot.querySelector("ul");
    if (!ul) {
      ul = document.createElement("ul");
      this.shadowRoot.appendChild(ul);
    }

    // On vide l'ul pour re-rendre la liste
    ul.innerHTML = "";

    // Création des éléments de tâches
    todos.forEach((todo) => {
      const todoElement = document.createElement("todo-task");

      // On définit les attributs nécessaires pour chaque tâche
      todoElement.setAttribute("label", todo.label);
      todoElement.setAttribute("done", todo.done);
      todoElement.setAttribute("id", todo.id);

      // On ajoute l'élément <todo-task> à un <li>
      const li = document.createElement("li");
      li.appendChild(todoElement);
      ul.appendChild(li);
    });
  }

  // Méthode de nettoyage lorsque l'élément est détaché du DOM
  disconnectedCallback() {
    this.unsubscribe();
  }
}

customElements.define("todo-list", TodoList);
