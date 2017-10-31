const path = require('path')
const fs = require('fs')

const resolve = function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const files = fs.readdirSync(resolve('src/scripts/pages'))
const entries = {}

files.forEach((file) => {
  const filename = path.parse(file).name
  const filePath = resolve('src/scripts/pages', file)

  entries[filename] = [ filePath ]
})

const config = {
  entry: entries,
  output: {
    path: resolve('./dist/scripts'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@': resolve('src/scripts/libs')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src/scripts')]
      }
    ]
  }
}

module.exports = config
