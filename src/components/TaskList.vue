<script setup lang="ts">
import Task from "./Task.vue";
import ListNavbar from "./ListNavbar.vue";
import draggable from "vuedraggable";

const props = defineProps({
  id: Number,
  taskList: Object,
  name: String,
});

const emit = defineEmits([
  "addTaskToList",
  "editTaskList",
  "editTask",
  "updateTasks",
]);

const handleEditTask = (taskIndex: any) => {
  emit("editTask", taskIndex);
};
</script>

<template>
  <div class="w-full lg:w-3/5 rounded text-white-primary mb-10">
    <ListNavbar
      :id="props.id"
      :name="name"
      @addTaskToList="emit('addTaskToList')"
      @editTaskList="emit('editTaskList')"
    />
    <div
      v-if="props.taskList && props.taskList.isOpen"
      class="bg-dark-foreground rounded p-4"
    >
      <draggable
        v-model="props.taskList.tasks"
        group="tasks"
        @change="emit('updateTasks', props.taskList.tasks)"
      >
        <template #item="{ element, index }">
          <Task
            :name="element"
            :id="index"
            :listId="props.id"
            :isActive="true"
            @editTask="handleEditTask"
            class="cursor-grab active:cursor-grabbing"
          />
        </template>
      </draggable>
      <Task
        v-for="(task, index) in props.taskList.finishedTasks"
        :key="index"
        :name="task"
        :id="index"
        :listId="props.id"
        :isActive="false"
        @editTask="handleEditTask"
      />
    </div>
    <div v-else></div>
  </div>
</template>
