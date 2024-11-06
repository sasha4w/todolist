import { todoStore } from "../todo-store.js";
import "./todo-task.js";

class TodoList extends HTMLElement{
    connectedCallback() {
    this.attachShadow({ mode: "open" });    
    this.render();
}
disconnectedCallback() {

}
render() {
    this.shadowRoot.innerHTML = /*HTML */ `
        <li>un</li>
        <li>deux</li>
       
    `;
    //foreach todos as todo -> <todo-task>checkbock</todo-task> avec map

    this.$todoTask = this.shadowRoot.querySelectorAll("todo-task");

}

attributeChangedCallback(name, oldValue, newValue) {
}
}
customElements.define("todo-list", TodoList);


