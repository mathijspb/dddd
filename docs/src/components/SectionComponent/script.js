import Intro from '../Intro/index.vue';
import Properties from '../Properties/index.vue';
import Example from '../Example/index.vue';

export default {
    props: ['data'],

    components: {
        Intro,
        Properties,
        Example,
    },
};
