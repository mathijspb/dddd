<template>
    <div>
        <h1>
            <a name="components">Components</a>
        </h1>
        <div>
            <SectionComponent v-for="item in data" :key="item.title" :data="item" />
        </div>
    </div>
</template>

<script src="./script.js"></script>
