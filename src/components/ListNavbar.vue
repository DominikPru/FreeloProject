<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  id: Number
});

</script>

<template>
  <div
    class="bg-action-primary w-full h-12 rounded shadow-md text-white-primary flex items-center px-3 justify-end"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6 cursor-pointer"
      @click="store.commit('toggleTaskList', props.id); store.dispatch('saveTasks')"
    >
    
      <path
     v-if="store.state.taskLists[props.id].isOpen"
        fill-rule="evenodd"
        d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
        clip-rule="evenodd"
      />
      <path
      v-else
       
        fill-rule="evenodd"
        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<style scoped></style>