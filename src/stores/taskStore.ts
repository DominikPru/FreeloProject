import { createStore, Store } from "vuex";

interface TaskList {
    tasks: any[];
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
                tasks: ["test"],
                isOpen: false,
                name: "",
            },
            {
                tasks: ["test"],
                isOpen: true,
                name: "",
            },
        ],
    },
    actions: {
        loadTasks({ state }: { state: State }) {
            const storedTaskLists = localStorage.getItem('taskLists');
            if (storedTaskLists) {
                state.taskLists = JSON.parse(storedTaskLists);
            }
        },
        saveTasks({ state }: { state: State }) {
            localStorage.setItem('taskLists', JSON.stringify(state.taskLists));
        },
    },
    mutations: {
        toggleTaskList(state: State, index: number) {
            state.taskLists[index].isOpen = !state.taskLists[index].isOpen;
        },
    },
});