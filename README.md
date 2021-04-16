# archive-webpack-plugin

This webpack plugin allows you to compress files into tar, zip and other formats.

## Usage

```js
const ArchiveWebpackPlugin = require('archive-webpack-plugin');

config.plugins = [
  new ArchiveWebpackPlugin({
    source: 'dist/',
    destination: 'static.tar',
    format: 'tar' // tar, zip
  })
]
```

### directory structure

```
dist
│   ├── index.html
│   ├── index.js
│   ├── index.js.map
│   └── index.min.css
├── static.tar
```
