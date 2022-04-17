<template>
    <div class="properties">
        <table>
            <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
            <tr v-for="item in data" :key="item.propery">
                <td>{{ item.property }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.default }}</td>
                <td>{{ item.description }}</td>
            </tr>
        </table>
    </div>
</template>

<script src="./script.js"></script>
