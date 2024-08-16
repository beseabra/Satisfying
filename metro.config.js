const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'], // Adiciona as extensões aqui
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
