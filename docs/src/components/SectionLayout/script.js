import Intro from '../Intro/index.vue';
import Parameters from '../Parameters/index.vue';
import Properties from '../Properties/index.vue';
import Example from '../Example/index.vue';

export default {
    props: ['data'],

    components: {
        Intro,
        Parameters,
        Properties,
        Example,
    },
};
