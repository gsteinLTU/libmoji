const path = require('path');

module.exports = [
    {
      entry: './src/index.ts',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
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
      entry: './src/index.ts',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
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
  