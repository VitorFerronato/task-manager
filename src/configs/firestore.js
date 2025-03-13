import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

// Adicionar nova tarefa
export const addTask = async (task) => {
  await addDoc(tasksCollection, { ...task, status: "todo" }); // Por padrão, nova tarefa vai para "To Do"
};

// Obter todas as tarefas
export const getTasks = async () => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Atualizar tarefa (mudar status)
export const updateTask = async (taskId, updatedData) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, updatedData);
};

// Excluir tarefa
export const deleteTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
};
