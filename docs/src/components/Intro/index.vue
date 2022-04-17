<template>
    <div class="intro">
        <h2>
            <a v-bind:name="data.anchor">{{ data.title }}</a>
        </h2>
        <p>{{ data.description }}</p>
    </div>
</template>

<script src="./script.js"></script>
