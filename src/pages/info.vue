<script setup lang="ts">
import pkg from '../../package.json';

const deleteAll = () => {
    ElMessageBox.confirm(
        '此動作將會清空測驗紀錄、收藏單字並重置今日單字資料且無法復原',
        `確定要清空所有資料？`,
        {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            type: 'error',
        }
    )
        .then(() => {
            deleteAllDB()
            ElMessage({
                type: 'success',
                message: '清除成功',
            })
        })
}
</script>

<template>
    <div class="w-full h-[calc(100%-20px)] flex flex-col items-center p-5 bg-darkbg">
        <h1 class="w-full text-5xl text-center mb-3 md:mb-10 font-Unica">Info</h1>
        <div class="w-full md:w-1/4">
            <ul>
                <li class="mb-3 border rounded-lg" @click="deleteAll">
                    <button type="button" class="w-full flex items-center text-lg text-left p-3" title="清空所有資料">
                        <Icon name="material-symbols:cleaning-services" class="mr-1.5"></Icon>
                        <span class="block truncate leading-relaxed">清空所有資料</span>
                    </button>
                </li>
                <li class="mb-3 border rounded-lg">
                    <a class="w-full flex items-center text-lg text-left p-3"
                        href="https://github.com/JingKai1994/DailyWords" target="_blank" title="GitHub - Daily Words"
                        rel="noreferrer">
                        <Icon name="pajamas:github" class="mr-1.5"></Icon>
                        <span class="block truncate leading-relaxed">GitHub</span>
                    </a>
                </li>
            </ul>
            <div class="mt-8 mb-2 text-center text-lg leading-6">
                <p>Version: {{ pkg.version }}</p>
                <p>Created By
                    <a href="https://github.com/JingKai1994" target="_blank" title="GitHub @RogerWang" rel="noreferrer">
                        @Roger Wang
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>