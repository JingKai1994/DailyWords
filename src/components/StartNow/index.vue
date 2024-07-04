<template>
    <div class="w-full md:w-3/4 lg:w-1/3 mx-auto">
        <h2 class="w-full text-5xl text-center mb-10 font-Unica">Start Now</h2>
        <p class="text-xl text-center mb-10">Why wait for tomorrow to learn something new? Start expanding your
            vocabulary
            today. Dive into the world
            of
            words
            now and wake up wiser tomorrow.
        </p>
        <div class="w-full flex flex-col md:flex-row justify-center">
            <NuxtLink to="/wordlist">
                <el-button type="primary" size="large" round class="mx-3 mb-5 md:mb-0">
                    <span class="text-base font-bold">Discover Words</span>
                </el-button>
            </NuxtLink>
            <NuxtLink to="/favorite">
                <el-button type="danger" size="large" round class="mx-3">
                    <span class="text-base font-bold">My Favourites</span>
                </el-button>
            </NuxtLink>
        </div>
    </div>
</template>