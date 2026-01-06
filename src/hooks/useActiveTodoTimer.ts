import {  useEffect } from "react";
import { usePomodoroAction } from "../context/pomodoroProvider";
import { useTodoStore } from "../store/todo.store";
import type { PostMessagePayload, UUIDTypes } from "../type";


export default function useActiveTodoTimer() {
  const {
    status,
    initTaskSession,
    initFreeSession,
    subscribe,
    isReady,
  } = usePomodoroAction();

  const {activeTodoId,activateTodo, deactivateActiveTodo, markCompleted, updateTodo } =
    useTodoStore();
  const getTodos = useTodoStore.getState().getTodos;

  const isTimerActive = status === "ticking";

  const startTodo = (id: UUIDTypes)=>{

    deactivateActiveTodo();
      initFreeSession();
   
    activateTodo(id);
         initTaskSession(id);
  }

  const clearActiveTodo = () => {
    if (isTimerActive) return;

    deactivateActiveTodo();
    initFreeSession();
  };

  const completeActiveTodo = (id: UUIDTypes) => {
    if (isTimerActive) return;
   
     
    clearActiveTodo();
    markCompleted(id);

   
  };

  const incrementCompletedPomo = ({id,mode}:PostMessagePayload<'complete'>['payload']) => {
    if (!activeTodoId) return;
    console.log(id,mode)
    if(mode!== 'focus') return;

    const todo = getTodos().find((t) => t.id === activeTodoId);
    if (!todo) return;

    const nextCompleted = todo.completedPomo + 1;

    updateTodo(todo.id, { completedPomo: nextCompleted });

    if (nextCompleted >= todo.estimatedPomo) {
      deactivateActiveTodo();
      initFreeSession();
    }
  }

  useEffect(()=>{
    console.log("hook create");
    const activeTodo = getTodos().find((t)=> t.id=== activeTodoId);

    if(!activeTodo) return;

     initTaskSession(activeTodo.id,activeTodo.focusDuration);
  
    return ()=>{
      console.log("hook destroyed")
    }
  },[activeTodoId])
  useEffect(() => {
    if (!isReady) return;


    return subscribe("complete", (payload) => {
      incrementCompletedPomo(payload);
    });
  }, [subscribe, isReady]);

  return {
    startTodo,
    clearActiveTodo,
    completeActiveTodo,
  };
}
