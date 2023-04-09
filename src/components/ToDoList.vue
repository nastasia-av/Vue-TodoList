<script>
    import { useTodoListStore } from '@/store/useToDoList';
    import { storeToRefs } from "pinia";
    export default {
        data() {
            const store = useTodoListStore()
            store.getSavedTodoList()
            const { filteredAndOrderedTodoList, shown, order} = storeToRefs(store);
            const { toggleCompleted, deleteTodo, editTodo, todoChanged} = store;

            return { filteredAndOrderedTodoList, toggleCompleted, deleteTodo, editTodo, todoChanged, shown, order};
        },
        methods: {
            shownSelected(event) {
                this.shown = event.target.value
            },
            orderSelected(event) {
                this.order = event.target.value
            }
        }
};
</script>

<template>
    <div class="d-flex">
        <p class = "main-title me-5">TO DO</p>
        <div class = "d-flex flex-row ms-auto">
            <p class = "pt-1 mx-3">Show</p>
            <select class="form-select" style="width: 200px; height: 40px;" @change="shownSelected($event)">
                <option value="0" selected >All (default)</option>
                <option value="1">Completed</option>
                <option value="2">Not completed</option>
            </select>
            <p class = "pt-1 mx-3">Order by</p>
            <select class="form-select" style="width: 300px; height: 40px;" @change="orderSelected($event)">
                <option value="0" selected>Date: old first (default)</option>
                <option value="1">Date: new first</option>
                <option value="2">Important first</option>
                <option value="3">Name: A to Z</option>
                <option value="4">Name: Z to A</option>
            </select>
        </div>
    </div>
    <div class="d-grid gap-3" v-for="todo in filteredAndOrderedTodoList" :key="todo.id">
        <div class="my-2 p-2 shadow-sm todo">
            <div class="d-flex flex-row">
                <input v-if = "todo.completed" class="mx-2 form-check-input align-self-center" type = "checkbox" id="flexCheckChecked" checked 
                @click.stop="toggleCompleted(todo.id)">
                <input v-else class="mx-2 form-check-input align-self-center" type = "checkbox" id="flexCheckDefault"  
                @click.stop="toggleCompleted(todo.id)">
                <i v-if = "todo.important" class="ms-2 pt-2 bi bi-flag-fill flag align-self-center"></i>
                <div class = "d-flex flex-grow-1 pt-2">
                    <div class ="d-flex flex-column align-self-center mx-3 flex-grow-1" v-if = "!todo.editEnabled">
                        <span class = "d-flex flex-grow-1" :class="{ completed: todo.completed, important: todo.important }">{{ todo.item }}</span>
                        <span class = "comment-text d-flex flex-grow-1" v-if="todo.comment"># {{ todo.comment }}</span>
                    </div>
                    <div class = "d-flex flex-grow-1" v-else>
                        <form class = "d-flex flex-column align-self-center mx-3 flex-grow-1" @submit.prevent="todoChanged(todo.id, todo.item)">
                            <div class = "d-flex flex-row">
                                <input class = "form-control me-3" type="text" v-model = "todo.item">
                                <input class ="form-check" type="checkbox" v-model = "todo.important"  id="flexCheckDefault"> 
                                <label class="form-check-label mx-2 label-editing" for="flexCheckDefault">
                                    Mark as important
                                </label>
                            </div>
                            <textarea class="form-control my-2" v-model="todo.comment"></textarea>
                        </form>
                    </div>
                </div>
                <div class = "ms-auto align-self-center">
                    <button class="btn ms-2 bi bi-pencil edit-todo-button" @click="editTodo(todo.id)"></button>
                    <button class="btn mx-1 bi bi-dash delete-todo-button" @click="deleteTodo(todo.id)"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .completed {
        text-decoration: line-through;
    }
    .important{
        font-weight: bold;
    }
    .main-title {
        font-weight: bold;
        font-size: 28px;
    }
    .todo{
        border-radius: 10px;
        background-color: white;
    }
    .flag {
        color: #f99d80;
    }
    .edit-todo-button {
        border-radius: 50% !important;
        background-color: #9b9eff !important;
    }
    .delete-todo-button {
        border-radius: 50% !important;
        background-color: #dadada !important;
    }
    .comment-text{
        font-size: 18px;
    }
    .label-editing {
        font-size: 20px;
    }
</style>