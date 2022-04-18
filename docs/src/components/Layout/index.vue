<template>
    <div>
        <h1>
            <a name="layout">Layout</a>
        </h1>
        <div>
            <Section v-for="item in data" :key="item.title" :data="item" />
        </div>
    </div>
</template>

<script src="./script.js"></script>
