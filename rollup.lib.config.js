import html from 'rollup-plugin-html';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';

export default {
    input: 'src/dddd.js',
    output: {
        file: 'dist/DDDD.js',
        name: 'DDDD',
        format: 'umd',
    },
    plugins: [
        html({
            include: '**/*.html',
        }),
        string({
            include: '**/*.css',
        }),
        nodeResolve(),
        commonjs(),
    ],
};
