module.exports = {
  stories: ["../src/**/*.stories.tsx", "../src/**/*.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-styling",
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
    "@storybook/addon-actions",
  ],
  docs: {
    autodocs: true,
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};
