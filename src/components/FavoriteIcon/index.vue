<script setup lang="ts">
const isFavorite = defineModel("isFavorite", {
    type: Boolean,
    default: false
})
const number = defineModel("number", {
    type: String,
    default: ''
})
defineProps({
    dailyPage: Boolean
})
const wordListStore = useWordListStore()
const { toggleFavorite } = wordListStore

const DailyWordListStore = useDailyWordListStore()
const { toggleDailyFavorite } = DailyWordListStore

</script>
<template>
    <button type="button" aria-label="favorite-button" class="absolute" :class="{ 'fav-icon': isFavorite }" title="加入收藏"
        @click.stop="dailyPage ? toggleDailyFavorite(number) : toggleFavorite(number)">
        <Icon name="material-symbols-light:kid-star" class="w-6 h-6"
            :class="isFavorite ? 'text-yellow-400' : 'text-gray-300'">
        </Icon>
    </button>
</template>
<style lang="scss" scoped>
.fav-icon {
    animation: banuce 0.2s ease 0s 2 alternate;

    &::before,
    &::after {
        opacity: 0;
        content: '';
        position: absolute;
        border-radius: 50%;
    }

    &::before {
        left: 50%;
        top: 50%;
        width: 10%;
        height: 10%;
        transform: translate(-50%, -50%);
        background: transparent;
        box-shadow: 10px -10px 0 #fed001, 10px 10px 0 #fed001,
            -10px -10px 0 #fed001, -10px 10px 0 #fed001;
        animation: show 0.2s steps(1, end) 0s 1;
    }

    &::after {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        animation: circle 0.3s ease 0.02s 1 alternate;
        background: rgba(254, 208, 1, 0.1);
    }


    @keyframes banuce {
        0% {
            transform: scale(0.8);
        }

        100% {
            transform: scale(1.35);
        }
    }

    @keyframes circle {
        0% {
            transform: scale(0.2);
            opacity: 0.8;
        }

        100% {
            transform: scale(1.5);
            opacity: 1;
        }
    }

    @keyframes show {
        0% {
            opacity: 1;
        }
    }
}
</style>