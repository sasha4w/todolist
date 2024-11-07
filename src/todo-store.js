class TodoStore {
  #todos = [];
  #listeners = [];

  getTodos() {
    return this.#todos;
  }
  getByIdTodo(id) {
    return this.#todos.find((todo) => todo.id === id);
  }

  getRemainingTodos() {
    return this.#todos.filter((todo) => todo.done === false).length;
  }

  createTodo(label) {
    this.#todos.push({
      label: label,
      done: false,
      id: crypto.randomUUID(),
    });
    this.#notify();
  }

  deleteTodo(id) {
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
    this.#notify();
  }

  deleteCheckedTodos() {
    this.#todos = this.#todos.filter((todo) => todo.done === false);
    this.#notify();
  }

  deleteAllTodo() {
    this.#todos = [];
    this.#notify();
  }

  editTodo(id, newLabel) {
    const todo = this.getByIdTodo(id);
    if (todo) {
      todo.label = newLabel;
      this.#notify();
    }
  }

  checkTodo(id) {
    const todo = this.getByIdTodo(id);
    if (todo) {
      todo.done = !todo.done;
      this.#notify();
    }
  }
  checkAllTodo() {
    if (this.getRemainingTodos() > 0) {
      this.#todos.forEach((todo) => {
        todo.done = true;
      });
      this.#notify();
    }
  }

  hasCheckedTodos() {
    return this.#todos.some((todo) => todo.done === true);
  }

  subscribe(listener) {
    this.#listeners.push(listener);
    return () => this.#unsubscribe(listener);
  }

  #notify() {
    this.#listeners.forEach((listener) => listener());
  }

  #unsubscribe(callback) {
    this.#listeners = this.#listeners.filter(
      (listener) => listener !== callback
    );
  }
}

export const todoStore = new TodoStore();
