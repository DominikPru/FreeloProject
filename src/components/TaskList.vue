<script setup lang="ts">
import Task from './Task.vue';
import ListNavbar from './ListNavbar.vue';
import { useStore } from 'vuex';
import { defineProps } from 'vue';

const props = defineProps({
  id: Number
});

const store = useStore();
</script>

<template>
  <div class="w-full lg:w-3/5 rounded text-white-primary mb-10">
    <ListNavbar :id="props.id"/>
    <div v-if="props.id !== undefined && store.state.taskLists[props.id] && store.state.taskLists[props.id].isOpen" class="bg-dark-foreground rounded p-4">
      <Task 
        v-for="(task, index) in store.state.taskLists[props.id].tasks" 
        :key="index" 
        :name="task" 
      />
    </div>
    <div v-else></div>
  </div>
</template>

<style scoped>
</style>