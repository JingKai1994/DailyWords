<template>
    <div
        class="fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-[#1a1b23] z-50">
        <div class="absolute top-1/2 left-1/2 w-8 h-8 animate-[loader_1.2s_ease-in-out_infinite] -translate-x-1/2 -translate-y-1/2 rotate-45">
            <span
                class="absolute t-0 left-0 block w-5 h-5 opacity-80 bg-yellow-400 dark:bg-yellow-100 animate-[loader-block_1.2s_ease-in-out_infinite]"></span>
            <span
                class="absolute t-0 right-0 block w-5 h-5 opacity-80 bg-yellow-400 dark:bg-yellow-100 animate-[loader-block-inverse_1.2s_ease-in-out_infinite]"></span>
            <span
                class="absolute bottom-0 left-0 block w-5 h-5 opacity-80 bg-yellow-400 dark:bg-yellow-100 animate-[loader-block-inverse_1.2s_ease-in-out_infinite]"></span>
            <span
                class="absolute bottom-0 right-0 block w-5 h-5 opacity-80 bg-yellow-400 dark:bg-yellow-100 animate-[loader-block_1.2s_ease-in-out_infinite]"></span>
        </div>
    </div>
</template>
<style>
@keyframes loader {
    0%, 10%, 100% {
        width: 2.5rem;
        height: 2.5rem;
    }

    65% {
        width: 5rem;
        height: 5rem;
    }
}

@keyframes loader-block {
    0%, 30% {
        transform: rotate(0);
    }

    55% {
        opacity: 1;
    }

    100% {
        transform: rotate(90deg);
    }
}

@keyframes loader-block-inverse {
    0%, 20% {
        transform: rotate(0);
    }

    55% {
        opacity: 1;
    }

    100% {
        transform: rotate(-90deg);
    }
}
</style>