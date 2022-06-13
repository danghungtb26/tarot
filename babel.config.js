module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@apis': './src/apis',
          '@assets': './src/assets',
          '@commons': './src/commons',
          '@components': './src/components',
          '@configs': './src/configs',
          '@constants': './src/constants',
          '@features': './src/features',
          '@locales': './src/locales',
          '@models': './src/models',
          '@navigation': './src/navigation',
          '@providers': './src/providers',
          '@services': './src/services',
          '@screens': './src/screens',
          '@storages': './src/storages',
        },
      },
    ],
  ],
}
