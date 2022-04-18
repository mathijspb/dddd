<template>
    <section>
        <Intro v-bind:data="data.intro" />
        <Parameters v-bind:data="data.api.parameters" v-if="data.api.parameters" />
        <Properties v-bind:data="data.api.properties" v-if="data.api.properties" />
        <Example v-bind:data="data.example" />
    </section>
</template>

<script src="./script.js"></script>
