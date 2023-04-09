import { defineStore } from "pinia"


export const useTodoListStore = defineStore('todoList', {
    state: () => ({
      todoList: [],
      id: 0,
      shown: "0",
      order: "0"
    }),
    actions: {
      getSavedTodoList() {
        const savedTodoList = JSON.parse(localStorage.getItem("todolist"))
        if (savedTodoList) {
            this.todoList = savedTodoList.todoList
            this.id = savedTodoList.id
        }
      },
      addTodo(item, boolValue, comment) {
        this.todoList.push({ item, id: this.id++, important: boolValue, comment: comment, completed: false, editEnabled: false, createdAt: new Date})
        localStorage.setItem("todolist", JSON.stringify(this))
      },
      deleteTodo(itemID) {
        this.todoList = this.todoList.filter((object) => {
          return object.id !== itemID;
        });
        localStorage.setItem("todolist", JSON.stringify(this))
        if(this.todoList.length === 0) {
          localStorage.removeItem("todolist")
        }
      },
      toggleCompleted(itemID) {
        const todo = this.todoList.find((obj) => obj.id === itemID);
        if (todo) {
          todo.completed = !todo.completed;
        }
        localStorage.setItem("todolist", JSON.stringify(this))
      },
      editTodo(itemID) {
        const todo = this.todoList.find((obj) => obj.id === itemID);
        if (todo) {
          todo.editEnabled = !todo.editEnabled;
        }
      },
      todoChanged(itemID, item) {
        const todo = this.todoList.find((obj) => obj.id === itemID);
        todo.item = item;
        todo.editEnabled = !todo.editEnabled;
        localStorage.setItem("todolist", JSON.stringify(this))
      }
    },
    getters: {
      filteredTodoList() {
        if (this.shown === "1") {
          return this.todoList.filter((t) => t.completed)
        }
        else if (this.shown === "2") {
          return this.todoList.filter((t) => !t.completed)
        }
        return this.todoList
      },
      filteredAndOrderedTodoList() {
        if(this.order === "1") {
          return this.filteredTodoList.sort((a,b) => {
            if(a.createdAt > b.createdAt) {
             return -1
            }
            else {
             return 1
            }
         })
        } 
        else if(this.order === "2") {
          this.filteredTodoList.sort((a,b) => {
            return a.id - b.id
          })
          return this.filteredTodoList.sort((a,b) => {
            if (a.important === b.important) {
              return 0
            }
            else if (a.important) {
              return -1
            }
            else {
              return 1
            }
          })
        }
        else if (this.order === "3") {
          return this.filteredTodoList.sort((a,b) => {
            const nameA = a.item.toLowerCase()
            const nameB = b.item.toLowerCase()
            if(nameA > nameB) {
             return 1
            }
            else {
             return -1
            }
         })
        }
        else if (this.order === "4") {
          return this.filteredTodoList.sort((a,b) => {
            const nameA = a.item.toLowerCase()
            const nameB = b.item.toLowerCase()
            if(nameA > nameB) {
             return -1
            }
            else {
             return 1
            }
         })
        }
        return this.filteredTodoList.sort((a,b) => {
           if(a.createdAt > b.createdAt) {
            return 1
           }
           else {
            return -1
           }
        })
      }
    }
})