import html from 'rollup-plugin-html';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import livereload from 'rollup-plugin-livereload';
// import serve from 'rollup-plugin-serve';
import { string } from "rollup-plugin-string";

export default {
    input: 'src/dddd.js',
    output: {
        file: 'extension/devtools-tab/dddd.js',
        name: 'DDDD',
        format: 'umd',
    },
    plugins: [
        html({
            include: '**/*.html',
        }),
        string({
            include: "**/*.css",
        }),
        nodeResolve(),
        commonjs(),
        // livereload({
        //     exts: ['html', 'js', 'css'],
        //     verbose: true,
        //     watch: './example/**',
        // }),
    ],
};