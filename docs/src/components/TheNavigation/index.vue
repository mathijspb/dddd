<template>
    <nav>
        <a href="#layout" class="category">Layout</a>
        <ul>
            <li v-for="item in dataLayout" :key="item.title">
                <a :href="`#${ item.intro.anchor }`">{{ item.intro.title }}</a>
            </li>
        </ul>

        <a href="#components" class="category">Components</a>
        <ul>
            <li v-for="item in dataComponents" :key="item.title">
                <a :href="`#${ item.intro.anchor }`">{{ item.intro.title }}</a>
            </li>
        </ul>
    </nav>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
