class TodoStore {
  #todos = [
    {
      id: "",
      label: "Faire des courses",
      done: 0,
    },
  ];

  // Ajout d'un tableau d'écouteurs
  listeners = [];

  getTodos() {
    return this.#todos;
  }

  // Méthode pour obtenir le nombre de tâches restantes (non cochées)
  getRemainingTodos() {
    return this.#todos.filter((todo) => todo.done === 0).length;
  }

  createTodo(label) {
    this.#todos.push({
      label: label,
      done: 0,
      id: crypto.randomUUID(),
    });
    this.notify();
  }

  deleteTodo(id) {
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
    this.notify();
  }

  deleteCheckedTodos() {
    // Supprime toutes les tâches qui sont cochées
    this.#todos = this.#todos.filter((todo) => todo.done === 0);
    this.notify();
  }

  deleteAllTodo() {
    this.#todos = []; // Supprime toutes les tâches
    this.notify();
  }

  editTodo(id, newLabel) {
    const todo = this.#todos.find((todo) => todo.id === id);
    if (todo) {
      todo.label = newLabel;
      this.notify();
    }
  }

  checkTodo(id) {
    const todo = this.#todos.find((todo) => todo.id === id);
    if (todo) {
      todo.done = !todo.done;
      this.notify();
    }
  }

  checkAllTodo() {
    if (this.getRemainingTodos() > 0) {
      // Si des tâches sont non cochées, les cocher toutes
      this.#todos.forEach((todo) => {
        todo.done = 1; // Coche toutes les tâches
      });
      this.notify();
    }
  }

  hasCheckedTodos() {
    return this.#todos.some((todo) => todo.done === 1);
  }
  // Ajoute un écouteur aux changements
  onChange(listener) {
    this.listeners.push(listener);
  }

  // Appelle tous les écouteurs
  notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const todoStore = new TodoStore();
