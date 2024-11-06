class TodoStore {
  #todos =[
    {
      id:"",
      label: "Faires des cours",
      done: 0,
    }

  ]
    constructor() {
      this.todos = [];
    }
  
    getTodos() {
      return this.todos;
    }
    createTodo(label){
      //créer un objet avec id auto incrt, label récup et done à 0
      this.#todos.push({
        label: label, // ou juste label car clé et variable pareil
        done: 0,
        id: crypto.randomUUID(),
      })
    }
    deleteTodo(id){

    }
    editTodo(id){

    }
    checkTodo(id){
        //toggle done à 0/1
    }
  }
  
  export const todoStore = new TodoStore();