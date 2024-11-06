import { todoStore } from "../todo-store.js";
class TodoWrapper extends HTMLElement{
    connectedCallback() {
    this.attachShadow({ mode: "open" });    
    this.render();
}
disconnectedCallback() {

}
render() {
    this.shadowRoot.innerHTML = /*HTML */ `
        <ul><todo-list></todo-list></ul>

        <div id="taskCount">nombre de task</div>
        <button id="taskComplete">completeAll</button>
        <button id="taskClear">deleteAll</button>
    `;
    this.$taskCount = this.shadowRoot.getElementById("taskCount");
    this.$taskComplete = this.shadowRoot.getElementById("taskComplete");
    this.$taskClear = this.shadowRoot.getElementById("taskClear");

}

attributeChangedCallback(name, oldValue, newValue) {
}
}
customElements.define("todo-wrapper", TodoWrapper);


