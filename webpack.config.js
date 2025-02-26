const path = require('path');

module.exports = [
    {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'libmoji.umd.js',
        library: 'libmoji',
        libraryTarget: 'umd',
        globalObject: 'this'
      },
      mode: 'production'
    },
    {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'libmoji.esm.js',
        library: {
          type: 'module',
        },
      },
      experiments: {
        outputModule: true
      },
      mode: 'production'
    }
  ];
  