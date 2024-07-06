<script setup lang="ts">
const sentinel: Ref<HTMLElement | null> = ref(null);

provide('sentinel', sentinel);

</script>
<template>
    <el-config-provider>
        <el-container class="h-full" direction="vertical">
            <ClientOnly>
                <Menu />
            </ClientOnly>
            <!-- main -->
            <el-container direction="vertical">
                <!-- header -->
                <Header />
                <el-main class="bg-[#f5f5f5] dark:bg-transparent relative !p-0" ref="scrollElement">
                    <div class="flex flex-col">
                        <slot />
                    </div>
                    <div class="absolute top-0 w-full h-0.5 invisible" ref="sentinel"></div>
                </el-main>
            </el-container>
            <!-- footer -->
            <!-- <Footer /> -->
            <ScollToTop />
        </el-container>
    </el-config-provider>
</template>
