// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
var productionPath = path.join('D:/code/holder-manage-be/static')
shell.rm('-rf', assetsPath)
shell.rm('-rf', productionPath)
shell.mkdir('-p', assetsPath)
shell.mkdir('-p', productionPath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)
shell.cp('-R', 'static/*', productionPath)
shell.config.silent = false

webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))
    console.log(assetsPath + '/*')
    shell.cp('-R', assetsPath + '/*', productionPath)
    shell.cp('-R', config.build.assetsRoot + '/index.html', 'D:/code/holder-manage-be/templates')
})


