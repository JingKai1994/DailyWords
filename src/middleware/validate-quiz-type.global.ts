export default defineNuxtRouteMiddleware((to) => {
    if (
        to.path.startsWith("/quiz/cloze-") ||
        to.path.startsWith("/quiz/choice-")
    ) {
        const type = to.path.split("-")[1];
        if (!["word", "dailyWord", "favoriteWord"].includes(type)) {
            return navigateTo("/quiz");
        }
    }
});
