import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import tailwindConfig from "./tailwind.config.js";
import tailwindcss from "tailwindcss";
import svgr from "@svgr/rollup";

export default [
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
      postcss({
        inject: true,
        minimize: true,
        plugins: [tailwindcss(tailwindConfig)],
      }),
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
