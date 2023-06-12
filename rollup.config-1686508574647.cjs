'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var peerDepsExternal = require('rollup-plugin-peer-deps-external');
var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('@rollup/plugin-typescript');
var postcss = require('rollup-plugin-postcss');
require('postcss-import');
var tailwindcss = require('tailwindcss');
var svgr = require('@svgr/rollup');

var tailwindConfig = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

var rollup_config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: "lib/index.js",
        format: "cjs",
        sourcemap: false,
        name: "@ht/components",
      },
      {
        file: "lib/index.esm.js",
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      svgr(),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "./conflux-wallet-connect.css",
    output: [{ file: "lib/conflux-wallet-connect.css" }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        plugins: [tailwindcss(tailwindConfig)],
      }),
    ],
  },
];

exports.default = rollup_config;
