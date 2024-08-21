<template>
  <div>
    <h1>socket.io test</h1>
    <p>socket id: {{ socketId }}</p>
    <p v-if="message">gelen mesaj: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';

const message = ref('');
const socketId = ref('');
const token = 'JWT_TOKEN'; 
const socket = io('http://localhost:3000', {
  auth: {
    token
  }
}); 

onMounted(() => {
  socket.on('connect', () => {
    socketId.value = socket.id;
  });

  socket.on('message', (data) => {
    message.value = data;
  });

  socket.on('connect_error', (err) => {
    console.log(err.message); 
  });
});

onUnmounted(() => {
  socket.disconnect();
});
</script>