<script>
    import { ref } from "vue";
    import FormComp from "./components/ToDoForm.vue";
    import ListComp from "./components/ToDoList.vue";
    export default {
        data(){
            const username = ref("Username");
            const quote = ref("A place for your motivation quote");
            const savedUsername = localStorage.getItem("username")
            if (savedUsername) {
                username.value = savedUsername
            }
            const usernameEditEnable = true;
            const addTodoEnable = true;
            const quoteAddEnable = true;
            const addingTodo = false;
            return { username, quote, usernameEditEnable, addTodoEnable, quoteAddEnable, addingTodo}
        },
        methods: {
            usernameChanged(name){
                this.usernameEditEnable = !this.usernameEditEnable
                localStorage.setItem("username", name)
            },
            deleteUsernameFromStorage(){
                this.username = ""
                localStorage.removeItem("username")
            },
            quoteAdded(item){
                this.quoteAddEnable = !this.quoteAddEnable
                localStorage.setItem("quote", item) 
            },
            deleteQuoteFromStorage(){
                this.quote = "A place for your motivation quote"
                localStorage.removeItem("quote")
            },
        },
        components: {
            FormComp,
            ListComp,
        }
    };
</script>

<template>
    <div class="todo-app">
        <div class = "d-flex justify-content-between border-bottom border-3">
            <div class="m-3 align-self-center d-flex flex-column" style="width: 350px;">
                <div class="d-flex flex-column">
                    <h1> Hello, </h1>
                    <div class = "d-flex flex-row">
                        <h1 v-if="usernameEditEnable">
                            <span class = "my-2">  {{ username }}</span>
                        </h1>
                        <div v-else class = "d-flex flex-row">
                            <form class = "my-2 d-flex flex-row" @submit.prevent="usernameChanged(username)">
                                <input class="form-control" type ="text" placeholder="Type your name here" v-model="username">
                            </form>
                            <button class="m-2 bi bi-trash3 btn delete-username-button" v-on:click="deleteUsernameFromStorage()"></button>
                        </div>
                        <i class="mx-1 bi bi-pencil-square" v-on:click="usernameEditEnable = !usernameEditEnable"></i>
                    </div>
                </div>
                <div class="mt-5">
                    <button class="btn new-todo-button" type="button" @click="addingTodo = true">
                        <i class="bi bi-plus"></i>
                        New To-Do
                    </button>
                </div>
            </div>
            <div class= "d-flex flex-column align-self-center" style="width: 600px;">
                <div class="d-flex align-self-center pb-3">
                    <img src="./assets/quote-icon.png" class= "img-fluid d-block quote-icon" alt="Something went wrong...">
                </div>
                <div v-if="quoteAddEnable">
                    <h3 class ="quote">
                        "{{ quote }}"
                    </h3>
                    <div class= "align-self-end">
                        <button class="btn edit-quote-button" type="button" id="button-addon2" @click="quoteAddEnable = !quoteAddEnable">
                            <i class="bi bi-pencil"></i>
                            Edit quote
                        </button>
                        <button class="mx-2 btn delete-quote-button bi bi-trash3" @click="deleteQuoteFromStorage()"></button>
                    </div>
                </div>
                <div v-else>
                    <form class="my-3" @submit.prevent="quoteAdded(quote)">
                        <textarea class="form-control" type ="text" maxlength="200" placeholder="Type a short quote" v-model="quote"></textarea>
                        <div>
                            <button class="my-2 btn add-quote-button bi bi-plus" type="submit" id="button-addon2"></button>    
                            <button class="btn mx-2 exit-edit-quote-button" type="button" id="button-addon2" @click="quoteAddEnable = !quoteAddEnable">
                                <i class="bi bi-pencil"></i>
                                Quit editing
                            </button>
                        </div>               
                    </form>
                </div>
            </div>
            <div>
                <img src="./assets/heading_img.png" class="img-fluid d-block pic" alt="Something went wrong...">
            </div>
        </div>
        <div class = "d-flex flex-row justify-content-between content">
            <div v-if="addingTodo" class ="m-3 shadow-sm todo-form">
                <FormComp @response="(boolValue) => addingTodo = boolValue"/>
            </div>
            <div v-else>

            </div>
            <div class ="m-3" style="width: 100%;">
                <ListComp />
            </div>
        </div>
    </div>
</template>

<style>
    .todo-app {
        font-family: Courier New, monospace;
        font-size: 24px;
        padding-left: 50px;
        padding-right: 50px;
        padding-bottom: 50px;
        background-color: #fdf8f8;
    }
    .quote-icon{
        width:50px;
    }
    .pic {
        width: 350px;
    }
    .delete-username-button, .delete-quote-button, .exit-edit-quote-button {
        max-height: 40px;
        background-color: #dadada !important;
    }
    .new-todo-button {
        background-color: #9b9eff !important;
    }
    .edit-quote-button, .add-quote-button {
        background-color: #f99d80 !important;
    }
    .quote{
        word-break: break-all;
    }
    .content {
        padding-top: 20px;
    }
    .todo-form {
        width: 700px;
        background-color: #9b9eff;
        font-size: 20px;
        color: white;
        border-radius: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    }
    input {
        font-size: 20px !important;
    }
</style>