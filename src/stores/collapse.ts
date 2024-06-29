import { defineStore } from "pinia";

export const useCollapseStore = defineStore("collapseState", () => {
    const collapse = ref(true);

    const toggleCollapse = () => {
        collapse.value = !collapse.value;
    };

    return {
        collapse,
        toggleCollapse,
    };
});
