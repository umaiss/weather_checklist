// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
    resolver: {
        assetExts: ['png', 'jpg', 'jpeg', 'gif'],
        sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
        assetResolutions: ['1x', '2x', '3x'],
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);