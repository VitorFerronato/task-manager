<template>
  <v-container>
    <v-row no-gutters>
      <v-btn color="primary" class="mb-4" @click="dialog = true">
        <v-icon left>mdi-plus</v-icon> Nova Tarefa
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-card color="#374151" class="pa-3">
          <h3 class="text-center text-white">To Do</h3>
          <draggable
            v-model="tasks.todo"
            group="tasks"
            item-key="id"
            @end="updateTaskStatus"
            data-status="todo"
          >
            <template #item="{ element }">
              <v-card class="pa-3 my-2">
                <h4>{{ element.title }}</h4>
                <p>{{ element.description }}</p>
                <v-btn icon color="red" @click="removeTask(element.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card>
            </template>
          </draggable>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card color="#475569" class="pa-3">
          <h3 class="text-center text-white">In Progress</h3>
          <draggable
            v-model="tasks.inprogress"
            group="tasks"
            item-key="id"
            @end="updateTaskStatus"
            data-status="inprogress"
          >
            <template #item="{ element }">
              <v-card class="pa-3 my-2">
                <h4>{{ element.title }}</h4>
                <p>{{ element.description }}</p>
                <v-btn icon color="red" @click="removeTask(element.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card>
            </template>
          </draggable>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card color="#64748B" class="pa-3">
          <h3 class="text-center text-white">Done</h3>
          <draggable
            v-model="tasks.done"
            group="tasks"
            item-key="id"
            @end="updateTaskStatus"
            data-status="done"
          >
            <template #item="{ element }">
              <v-card class="pa-3 my-2">
                <h4>{{ element.title }}</h4>
                <p>{{ element.description }}</p>
                <v-btn icon color="red" @click="removeTask(element.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card>
            </template>
          </draggable>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card class="pa-5">
        <h2>Nova Tarefa</h2>
        <v-text-field v-model="newTask.title" label="Título"></v-text-field>
        <v-textarea
          v-model="newTask.description"
          label="Descrição"
        ></v-textarea>
        <v-btn color="primary" block @click="createTask">Adicionar</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { addTask, getTasks, updateTask, deleteTask } from "@/configs/firestore";
import draggable from "vuedraggable";

const dialog = ref(false);
const newTask = ref({ title: "", description: "" });
const tasks = ref({ todo: [], inprogress: [], done: [] });

const fetchTasks = async () => {
  const allTasks = await getTasks();
  tasks.value = {
    todo: allTasks.filter((t) => t.status === "todo"),
    inprogress: allTasks.filter((t) => t.status === "inprogress"),
    done: allTasks.filter((t) => t.status === "done"),
  };
};

const createTask = async () => {
  if (!newTask.value.title) return alert("O título é obrigatório!");
  await addTask({ ...newTask.value, status: "todo" });
  newTask.value = { title: "", description: "" };
  dialog.value = false;
  fetchTasks();
};

const updateTaskStatus = async (event) => {
  const taskIndex = event.oldIndex;
  const newColumn = event.to.dataset.status;
  let task;

  if (event.from.dataset.status === "todo") {
    task = tasks.value.todo[taskIndex];
  } else if (event.from.dataset.status === "inprogress") {
    task = tasks.value.inprogress[taskIndex];
  } else {
    task = tasks.value.done[taskIndex];
  }

  if (task) {
    await updateTask(task.id, { status: newColumn });
    fetchTasks();
  }
};

const removeTask = async (taskId) => {
  await deleteTask(taskId);
  fetchTasks();
};

onMounted(fetchTasks);
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
