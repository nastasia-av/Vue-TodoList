<script>
    import { ref } from 'vue';
    import { useTodoListStore } from '@/store/useToDoList';
    export default {
        data() {            
            const todo = ref('')
            const isImportant = ref(false)
            const comment = ref('')
            const store = useTodoListStore()
            function addItemAndClear(item, boolValue, com) {
                if (item.length === 0) {
                    return
                }
                store.addTodo(item, boolValue, com)
                todo.value = ''
                isImportant.value = false
                comment.value = ''
            }
            return { todo, store, isImportant, comment, addItemAndClear}
        },
        emits: ['response']
    }
</script>

<template>
    <form class="d-flex flex-column" @submit.prevent="addItemAndClear(todo, isImportant, comment)">
        <i class="bi bi-x-square-fill ms-auto" @click="$emit ('response', false)"></i>
        <label class = "form-control-label">Enter your to-do here:</label>
        <input class="form-control my-2" v-model="todo" type="text" />
        <div class = "d-flex flex-row">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="isImportant">
            <label class="form-check-label mx-2" for="flexCheckDefault">
                Mark as important
            </label>
        </div>
        <label class = "form-control-label my-2">Add a comment:</label>
        <textarea class="form-control" v-model="comment"></textarea>
        <button class="btn my-4 add-todo-button" type="submit" id="button-addon2">Add</button>
    </form>
    
</template>

<style>
    .add-todo-button {
        background-color: #f99d80 !important;
    }
</style>