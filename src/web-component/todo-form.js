import { todoStore } from "../todo-store.js";
import "./todo-button.js"
class TodoForm extends HTMLElement{
    connectedCallback() {
    this.attachShadow({ mode: "open" });    
    this.render();
}
disconnectedCallback() {

}
render() {
    this.shadowRoot.innerHTML = /*HTML */ `
        <form>
            <label>
            Tâche :
            </label>
            <input name:"label" required>
            </input>
            <todo-button label="Ajouter"></todo-button>
        </form>
    `;
    this.$form = this.shadowRoot.querySelector("form");
    this.$input = this.shadowRoot.querySelector("input");
    this.$todoButton = this.shadowRoot/this.querySelector("todo-button");
    this.$form.addEventListener('submit', (event)=> this.onSubmit(event));
}

onSubmit(event){
    event.preventDefault();
    //store 
    todoStore.createTodo(this.$input.value);

    this.$input.value="";
}

attributeChangedCallback(name, oldValue, newValue) {
}
}
customElements.define("todo-form", TodoForm);

