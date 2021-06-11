const path = require('path');

function resolve(dir) {
    return path.join(__dirname, './', dir);
}

module.exports = {
    devServer: {
        hot: true,
        open: true,
        port: 8448
    },
    publicPath: process.env.VUE_APP_PUBLICPATH,
    chainWebpack: config => {
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        // Svg
        config.module.rule('svg').exclude.add(resolve('src/icons')).end;
        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
        // Set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .options({
                compilerOptions: {
                    preserveWhitespace: false
                }
            })
            .end();

        // SourceMap
        config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'));

        config.when(process.env.NODE_ENV !== 'development', config => {
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            });
            config.optimization.runtimeChunk('single');
        });

        return config;
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [resolve('src/styles/variables.scss')]
        }
    }
};
