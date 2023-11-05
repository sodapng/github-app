const {
    configure,
    presets
} = require("eslint-kit");

module.exports = configure({
    allowDebug: process.env.NODE_ENV !== "production",

    presets: [
        presets.imports({
          sort: {
            newline: true
          },
        }),
        presets.typescript(),
        presets.react(),
        presets.prettier(),
    ],

    extend: {
      plugins: ['react-refresh'],
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
      },
      ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.js', 'postcss.config.js']
    }
});
