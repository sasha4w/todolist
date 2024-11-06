import { todoStore } from "../todo-store.js";
import "./todo-form.js";
import "./todo-wrapper.js";
class TodoApp extends HTMLElement{
        connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.render();
    }
    disconnectedCallback() {

    }
    render() {
        this.shadowRoot.innerHTML = /*HTML */ `
            <h1>Ma Todo liste</h1>
            <todo-form></todo-form>
            <todo-wrapper></todo-wrapper>

            

        `;
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
    }
}
customElements.define("todo-app", TodoApp);
