class TodoForm extends HTMLElement{
    connectedCallback() {
    this.render();
}
disconnectedCallback() {

}
render() {
    this.innerHTML = /*HTML */ `
        <h1></h1>
    `;
    
}

attributeChangedCallback(name, oldValue, newValue) {
}
}
customElements.define("todo-form", TodoForm);

