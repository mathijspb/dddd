<template>
    <section>
        <Intro v-bind:data="data.intro" />
        <Parameters v-bind:data="data.parameters" v-if="data.parameters" />
        <Properties v-bind:data="data.properties" v-if="data.properties" />
        <Example v-bind:data="data.example" />
    </section>
</template>

<script src="./script.js"></script>
