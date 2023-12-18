import { createStore, Store } from "vuex";

interface TaskList {
  tasks: any[];
  finishedTasks: any[];
  isOpen: boolean;
  name: string;
}

interface State {
  taskLists: TaskList[];
}

export const store: Store<State> = createStore<State>({
  state: {
    taskLists: [
      {
        tasks: ["My First Task"],
        finishedTasks: [],
        isOpen: true,
        name: "My First Task List",
      },
    ],
  },
  actions: {
    // most actions call their corresponing mutation and save the data to local storage
    loadTasks({ state }: { state: State }) {
      const storedTaskLists = localStorage.getItem("taskLists");
      if (storedTaskLists) {
        state.taskLists = JSON.parse(storedTaskLists);
      }
    },
    saveTasks({ state }: { state: State }) {
      localStorage.setItem("taskLists", JSON.stringify(state.taskLists));
    },
    addTaskList(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listName: string }
    ) {
      commit("addTaskList", payload);
      dispatch("saveTasks");
    },
    removeTaskList(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listIndex: number }
    ) {
      commit("removeTaskList", payload);
      dispatch("saveTasks");
    },
    toggleTaskList(
      { commit, dispatch }: { commit: any; dispatch: any },
      listIndex: number
    ) {
      commit("toggleTaskList", listIndex);
      dispatch("saveTasks");
    },
    addTaskToList(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listIndex: number; taskName: string }
    ) {
      commit("addTaskToList", payload);
      dispatch("saveTasks");
    },
    editTask(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listIndex: number; taskName: string; taskIndex: number }
    ) {
      commit("editTask", payload);
      dispatch("saveTasks");
    },
    removeTask(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listIndex: number; taskIndex: number; isActive: boolean }
    ) {
      commit("removeTask", payload);
      dispatch("saveTasks");
    },
    editTaskList(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listIndex: number; listName: string }
    ) {
      commit("editTaskList", payload);
      dispatch("saveTasks");
    },
    finishTask(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listIndex: number; taskIndex: number }
    ) {
      commit("finishTask", payload);
      dispatch("saveTasks");
    },
    unFinishTask(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listIndex: number; taskIndex: number }
    ) {
      commit("unFinishTask", payload);
      dispatch("saveTasks");
    },
    updateTasks(
      { commit, dispatch }: { commit: any; dispatch: any },
      payload: { listIndex: number; newTaskList: any[] }
    ) {
      commit("updateTasks", payload);
      dispatch("saveTasks");
    },
  },
  mutations: {
    addTaskList(state: State, payload: { listName: string }) {
      state.taskLists.push({
        tasks: [],
        finishedTasks: [],
        isOpen: true,
        name: payload.listName,
      });
    },
    removeTaskList(state: State, payload: { listIndex: number }) {
      state.taskLists.splice(payload.listIndex, 1);
    },
    toggleTaskList(state: State, listIndex: number) {
      state.taskLists[listIndex].isOpen = !state.taskLists[listIndex].isOpen;
    },
    addTaskToList(
      state: State,
      payload: { listIndex: number; taskName: string }
    ) {
      state.taskLists[payload.listIndex].tasks.push(payload.taskName);
    },
    editTask(
      state: State,
      payload: { listIndex: number; taskName: string; taskIndex: number }
    ) {
      state.taskLists[payload.listIndex].tasks[payload.taskIndex] =
        payload.taskName;
    },
    removeTask(
      state: State,
      payload: { listIndex: number; taskIndex: number; isActive: boolean }
    ) {
      console.log(payload);
      if (payload.isActive) {
        state.taskLists[payload.listIndex].tasks.splice(payload.taskIndex, 1);
      } else {
        state.taskLists[payload.listIndex].finishedTasks.splice(
          payload.taskIndex,
          1
        );
      }
    },
    editTaskList(
      state: State,
      payload: { listIndex: number; listName: string }
    ) {
      state.taskLists[payload.listIndex].name = payload.listName;
    },
    finishTask(
      state: State,
      payload: { listIndex: number; taskIndex: number }
    ) {
      const task = state.taskLists[payload.listIndex].tasks.splice(
        payload.taskIndex,
        1
      )[0];
      state.taskLists[payload.listIndex].finishedTasks.push(task);
    },
    unFinishTask(
      state: State,
      payload: { listIndex: number; taskIndex: number }
    ) {
      const task = state.taskLists[payload.listIndex].finishedTasks.splice(
        payload.taskIndex,
        1
      )[0];
      state.taskLists[payload.listIndex].tasks.push(task);
    },
    updateTasks(
      state: State,
      payload: { listIndex: number; newTaskList: any[] }
    ) {
      state.taskLists[payload.listIndex].tasks = payload.newTaskList;
    },
  },
});
