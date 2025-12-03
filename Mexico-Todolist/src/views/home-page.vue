<script setup lang="ts">

import { useRouter } from "vue-router"
import { RouteNames } from "../router/route-names";
const router = useRouter()

function goToApp() {
  router.push(RouteNames.TODO)
}

</script>

<template>

  <div class="landing-page">
    <div class="landing-card">
      <h1 class="trainee-name">Name of Trainee: Lawrence R. Mexico</h1>
      <p class="exercise-date">Exercise Started on: November 21, 2025</p>
      <button class="btn-primary" @click="goToApp">Go to App</button>
    </div>
  </div>

</template>

<style>
.landing-page {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: #ffffff;
}

.landing-card {
  background: #f4f4f5;
  padding: 2rem 3rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  max-width: 400px;
  box-sizing: border-box;
  color: #111827;
}

.trainee-name {
  font-size: 1.5rem;
  margin: 0;
}

.exercise-date {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
}

button {
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary {
  background: #4f46e5;
  color: #ffffff;
  border: 1px solid #4f46e5;
}

.btn-primary:hover {
  background: #4338ca;
  border-color: #4338ca;
}
</style>
