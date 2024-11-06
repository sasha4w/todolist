class TodoWrapper extends HTMLElement{
    connectedCallback() {
    this.render();
}
disconnectedCallback() {

}
render() {
    this.innerHTML = /*HTML */ `
        <p>test</p>
    `;
    
}

attributeChangedCallback(name, oldValue, newValue) {
}
}
customElements.define("todo-wrapper", TodoWrapper);


