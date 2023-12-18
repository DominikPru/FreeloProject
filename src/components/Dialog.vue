<template>
  <div
    class="flex flex-col bg-dark-foreground p-6 rounded shadow-lg sm:3/4 lg:w-1/4"
  >
    <form @submit.prevent="submit" class="w-full">
      <label
        for="textField"
        class="mb-2 font-bold text-lg text-white-primary"
        >{{ props.label }}</label
      >
      <input
        required
        maxlength="50"
        id="textField"
        v-model="text"
        type="text"
        class="border w-full p-2 rounded mb-4 focus:outline-action-primary focus:ring-0"
      />

      <div class="flex justify-end gap-4">
        <button
          type="button"
          @click="cancel"
          class="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  label: String,
  action: String,
  listIndex: String,
  taskIndex: String,
});

const text = ref("");

const emit = defineEmits([
  "addList",
  "addTask",
  "editList",
  "editTask",
  "cancel",
  "searchTasks",
]);

const submit = () => {
  if (props.action) {
    emit(
      props.action as
        | "addList"
        | "addTask"
        | "editList"
        | "editTask"
        | "cancel"
        | "searchTasks",
      text.value,
      props.listIndex,
      props.taskIndex
    );
  }
};

const cancel = () => {
  console.log("Cancelled");
  emit("cancel");
};

const onEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    cancel();
  }
};

onMounted(() => {
  window.addEventListener("keyup", onEscape);
});

onUnmounted(() => {
  window.removeEventListener("keyup", onEscape);
});
</script>
