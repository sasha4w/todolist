import { todoStore } from "../todo-store.js";
class TodoButton extends HTMLElement {
  static get observedAttributes() {
    return ["action"]; // Observer l'attribut `action` pour des mises à jour dynamiques
  }

  connectedCallback() {
    // Créez un shadow DOM si ce n'est pas déjà fait
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this.render();
  }

  // Mettre à jour le bouton lors du changement d'attribut
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "action") {
      this.render();
    }
  }

  render() {
    // Définir le label et le style du bouton en fonction de l'action
    const action = this.getAttribute("action") || "add";
    let label = "+";
    let color = "green"; // Couleur par défaut pour "ajout"

    if (action === "edit") {
      label = "&";
      color = "blue";
    } else if (action === "delete") {
      label = "-";
      color = "red";
    }

    // S'assurer que shadowRoot existe avant de tenter de manipuler son contenu
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = /* HTML */ `
        <style>
          button:hover {
            opacity: 0.7;
          }
          button {
            color: ${color};
            font-size: 1.5em;
            cursor: pointer;
            background: none;
            border: none;
            font-size: 1.2rem;
            padding: 0;
            margin: 0;
            cursor: pointer;
          }
        </style>
        <button type="button">${label}</button>
      `;

      // Ajouter un écouteur d'événement pour le bouton
      this.$button = this.shadowRoot.querySelector("button");
      this.$button.addEventListener("click", () => this.onClick());
    }
  }

  // Méthode d'événement click personnalisée
  onClick() {
    // Émettre un événement personnalisé en fonction de l'action
    const action = this.getAttribute("action") || "add";
    this.dispatchEvent(
      new CustomEvent("button-action", { detail: { action } })
    );
  }
}

customElements.define("todo-button", TodoButton);
