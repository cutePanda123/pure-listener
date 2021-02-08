module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utils': './src/utils',
          '@/navigator': './src/navigator',
          '@/pages': './src/pages',
          '@/models': './src/models',
          '@/config': './src/config',
          '@/assets': './src/assets',
          '@/components': './src/components'
        }
      }
    ]
  ]
};
