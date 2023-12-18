<template>
  <div class="flex items-center cursor-pointer">
    <div
      class="w-5 h-5 mr-2 border border-dark rounded flex items-center justify-center text-white-primary hover:text-action-primary"
      :class="{ 'bg-dark': isChecked }"
    >
      <svg
        v-if="isChecked"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  isChecked: Boolean,
});

const checked = ref(props.isChecked);

watch(
  () => props.isChecked,
  (newVal) => {
    checked.value = newVal;
  }
);
</script>
