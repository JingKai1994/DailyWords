<script setup lang="ts">
defineProps({
    word: String
})
</script>


<template>

    <button type="button" aria-label="speech" class="mr-5" @click="synthVoice(word)">
        <Icon name="ph:speaker-simple-high-fill" class="w-6 h-6"></Icon>
    </button>
</template>