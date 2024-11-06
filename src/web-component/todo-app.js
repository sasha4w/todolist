class TodoApp extends HTMLElement{
        connectedCallback() {
        this.render();
    }
    disconnectedCallback() {

    }
    render() {
        this.innerHTML = /*HTML */ `
            <h1>Ma Todo liste</h1>
            <todo-wrapper></todo-wrapper>
        `;
        
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
    }
}
customElements.define("todo-app", TodoApp);
