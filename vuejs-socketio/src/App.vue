<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import { ref, onMounted } from "vue";
import axios from "axios";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3000/";
const API_URL = "http://localhost:3000/api/message";

const message = ref("");
const messages = ref([]);
const welcomeMessage = ref("");

const socket = io(SOCKET_URL);

socket.on("message", (msg) => {
  messages.value = [...messages.value, msg];
});

socket.on("WELCOME_MESSAGE", (msg) => {
  welcomeMessage.value = msg;
});

const submit = async () => {
  try {
    await axios.post(API_URL, {
      message: message.value,
    });
    message.value = "";
  } catch (error) {
    console.error("ERROR:", error);
  }
};

const sendCustomMessage = () => {
  socket.emit("SEND_MESSAGE", "This is a custom message");
};

onMounted(() => {
  socket.on("connect", () => {
    console.log("socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});
</script>

<template>
  <div class="container-fluid h-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <div class="col-3 vh-100 bg-light border-end">
        <div class="d-flex flex-column align-items-stretch p-3">
          <h4 class="text-center mb-4">Chats</h4>
          <div class="list-group list-group-flush border-bottom scrollarea">
            <a
              href="#"
              class="list-group-item list-group-item-action py-3 lh-sm secondary bg-white"
            >
              <div
                class="d-flex w-100 align-items-center justify-content-between"
              >
                <strong class="mb-1">Melo</strong>
                <small class="text-body-secondary">Tues</small>
              </div>
              <div class="col-10 mb-1 small text-truncate">Last message</div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-9 d-flex flex-column">
        <div class="py-3 px-4 border-bottom bg-white">
          <h5 class="mb-0">Melo</h5>
          <div class="col-10 mb-1 small text-truncate">
            {{ welcomeMessage }}
          </div>
        </div>
        <div id="conversation" class="flex-grow-1 p-4" style="overflow-y: auto">
          <div class="row mb-2" v-for="message in messages" :key="message">
            <div class="col-12">
              <div class="alert alert-primary d-inline-block" role="alert">
                {{ message }}
              </div>
            </div>
          </div>
        </div>
        <form
          id="reply"
          class="p-3 border-top bg-white"
          @submit.prevent="submit"
        >
          <div class="input-group">
            <input
              class="form-control"
              placeholder="Write a message"
              v-model="message"
            />
            <button class="btn btn-primary" type="submit">Send</button>
          </div>
        </form>
        <div class="p-3">
          <button class="btn btn-secondary" @click="sendCustomMessage">
            Send Custom Message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
