import { defineStore } from "pinia";

export const useDialogVisibleStore = defineStore("dialogVisibleState", () => {
    const dialogVisible = ref(false);

    const dialogVisibleToogle = () => {
        dialogVisible.value = !dialogVisible.value;
    };

    return{
        dialogVisible, dialogVisibleToogle
    }
});
