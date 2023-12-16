<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "./Checkbox.vue";
import { defineProps } from 'vue';

const props = defineProps({
  name: String
});

const isChecked = ref(false);


const updateCheckbox = (value: any) => {
  isChecked.value = value;
};

const handleMouseOver = () => {
  isChecked.value = true;
};

const handleMouseLeave = () => {
  isChecked.value = false;
};
</script>

<template>
  <div class="text-white-primary text-sm">
    <ul>
      <li
        class="flex items-center py-1 border-b border-dark"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
      >
        <Checkbox
          class="form-checkbox h-5 w-5 mr-2 text-dark-bg border-none bg-dark"
          :isChecked="isChecked"
          @update="updateCheckbox"
        />
        {{ props.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>