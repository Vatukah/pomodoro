import { create } from "zustand";

export type TodoPanel = {
    isTodoPanel:boolean,
   close:()=>void,
   open:()=>void,
   toggle:()=>void
}

export const useTodoPanel = create<TodoPanel>((set)=>({

    isTodoPanel:true,
    close : ()=> set({isTodoPanel:false}),
    open : ()=> set( {isTodoPanel:true}),
    toggle : ()=> set((state)=>({isTodoPanel:!state.isTodoPanel}))
}))