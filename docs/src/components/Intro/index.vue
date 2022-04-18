<template>
    <div class="intro">
        <h2>
            <a v-bind:name="data.anchor" v-if="data.title">{{ data.title }}</a>
        </h2>
        <p v-if="data.description">{{ data.description }}</p>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.css" scoped></style>
