<template>
    <nav>
        <div class="group">
            <a href="#setup" class="category">Setup</a>
        </div>

        <div class="group">
            <a href="#layout" class="category">Layout</a>
            <ul>
                <li v-for="item in dataLayout" :key="item.title">
                    <a :href="`#${ item.intro.anchor }`">{{ item.intro.title }}</a>
                </li>
            </ul>
        </div>

        <div class="group">
            <a href="#components" class="category">Components</a>
            <ul>
                <li v-for="item in dataComponents" :key="item.title">
                    <a :href="`#${ item.intro.anchor }`">{{ item.intro.title }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script src="./script.js"></script>
<style src="./style.css" scoped></style>
