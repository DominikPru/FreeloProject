<script setup lang="ts">
import TaskList from './components/TaskList.vue';
import { useStore } from 'vuex'
import { onMounted } from 'vue';

const store = useStore();

onMounted(async () => {
  await store.dispatch('loadTasks');
});
</script>

<template>
    <div class="grid grid-cols-1 place-items-center py-10 px-5">
        <TaskList v-for="(taskList, index) in store.state.taskLists" :id="index" :key="index"/>
    </div>
</template>
