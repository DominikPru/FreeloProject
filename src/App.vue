<script setup lang="ts">
import TaskList from "./components/TaskList.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";
import Dialog from "./components/Dialog.vue";
import { ref } from "vue";

const store = useStore();

const isDialogOpen = ref(false);
const dialogLabel = ref("");
const dialogAction = ref("");
const dialogListIndex = ref();
const dialogTaskIndex = ref();
let searchResults = ref<
  { name: string; tasks: string[]; isOpen: boolean; finishedTasks: string[] }[]
>([]);

function openDialog(
  label: string,
  action: string,
  listIndex: number | null,
  taskIndex: number | null
) {
  dialogLabel.value = label;
  dialogAction.value = action;
  dialogListIndex.value = listIndex;
  dialogTaskIndex.value = taskIndex;
  isDialogOpen.value = true;
}

function closeDialog() {
  isDialogOpen.value = false;
}

function addTaskList(listName: string) {
  console.log(listName);
  store.dispatch("addTaskList", { listName: listName });
  closeDialog();
}

function addTaskToList(taskName: string, listIndex: number) {
  store.dispatch("addTaskToList", { listIndex: listIndex, taskName: taskName });
  closeDialog();
}

function editTask(taskName: string, listIndex: number, taskIndex: number) {
  store.dispatch("editTask", {
    listIndex: listIndex,
    taskName: taskName,
    taskIndex: taskIndex,
  });
  closeDialog();
}

function editTaskList(listName: string, listIndex: number) {
  store.dispatch("editTaskList", { listIndex: listIndex, listName: listName });
  closeDialog();
}

function searchTasks(searchTerm: string) {
  searchResults.value = [];
  store.state.taskLists.forEach((taskList: any) => {
    const matchingTasks = taskList.tasks.filter((task: any) =>
      task.includes(searchTerm)
    );
    const matchingFinishedTasks = taskList.finishedTasks.filter((task: any) =>
      task.includes(searchTerm)
    );

    if (matchingTasks.length > 0 || matchingFinishedTasks.length > 0) {
      searchResults.value.push({
        name: taskList.name,
        tasks: matchingTasks,
        isOpen: taskList.isOpen,
        finishedTasks: matchingFinishedTasks,
      });
    }
  });
  searchResults.value = searchResults.value;
  closeDialog();
}

onMounted(async () => {
  await store.dispatch("loadTasks");
});
</script>

<template>
  <div class="relative h-screen w-screen overflow-x-hidden">
    <div
      v-if="isDialogOpen"
      class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70"
    >
      <Dialog
        :label="dialogLabel"
        :action="dialogAction"
        :listIndex="dialogListIndex"
        :taskIndex="dialogTaskIndex"
        @cancel="closeDialog"
        @addList="addTaskList"
        @addTask="addTaskToList"
        @editTask="editTask"
        @editList="editTaskList"
        @searchTasks="searchTasks"
      />
    </div>
    <div class="flex justify-center mt-10 text-white-primary">
      <svg
        v-if="searchResults.length === 0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 cursor-pointer"
        @click="openDialog('Enter search term', 'searchTasks', null, null)"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 cursor-pointer"
        @click="searchResults = []"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 ml-3 cursor-pointer"
        @click="
          openDialog(
            'Enter a name for your new task list',
            'addList',
            null,
            null
          )
        "
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
    <div class="grid grid-cols-1 place-items-center py-10 px-5">
      <TaskList
        v-if="searchResults.length === 0"
        v-for="(taskList, index) in store.state.taskLists"
        :id="index"
        :taskList="taskList"
        :name="taskList.name"
        @addTaskToList="
          openDialog('Enter the name of your new task', 'addTask', index, null)
        "
        @editTaskList="
          openDialog(
            'Enter the new name of your to-do list',
            'editList',
            index,
            null
          )
        "
        @editTask="
          (taskIndex) => {
            openDialog(
              'Enter the new name of your task',
              'editTask',
              index,
              taskIndex
            );
          }
        "
      />
      <TaskList
        v-else
        v-for="(taskList, index) in searchResults"
        :key="index"
        :id="index"
        :name="taskList.name"
        :taskList="taskList"
        @addTaskToList="
          openDialog('Enter the name of your new task', 'addTask', index, null)
        "
        @editTaskList="
          openDialog(
            'Enter the new name of your to-do list',
            'editList',
            index,
            null
          )
        "
        @editTask="
          (taskIndex) => {
            openDialog(
              'Enter the new name of your task',
              'editTask',
              index,
              taskIndex
            );
          }
        "
      />
    </div>
  </div>
</template>
