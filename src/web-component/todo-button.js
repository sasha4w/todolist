import { todoStore } from "../todo-store.js";
class TodoButton extends HTMLElement{
    connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
}
disconnectedCallback() {

}
render() {
    this.shadowRoot.innerHTML = /*HTML */ `
        <button>+</button>
    `;
    this.$button = this.shadowRoot.querySelector("button");
    
}

attributeChangedCallback(name, oldValue, newValue) {
}
}
customElements.define("todo-button", TodoButton);

