import fs from 'fs';
import tarfs from 'tar-fs';
import zipdir from 'zip-dir';
import colors from 'colors-console';

class ArchiveWebpackPlugin {
  constructor(options = {}) {

    Object.assign({
      source: 'dist/',
      destination: 'assets.tar',
      format: 'tar'
    }, options);

    this.options = options;
  }

  tar() {
    const {source, destination} = this.options;
    console.log(`${colors('green', source)} -> ${colors('green', destination)}`);
    tarfs.pack(source).pipe(fs.createWriteStream(destination));
  }

  zip() {
    const {source, destination} = this.options;
    console.log(`${colors('green', source)} -> ${colors('green', destination)}`);
    zipdir(source, {saveTo: destination});
  }

  async start() {
    const {format} = this.options;

    switch (format) {
      case 'tar':
        this.tar();
        break;

      case 'zip':
        this.zip();
        break;

      default:
      this.tar();
    }
  }

  apply(compiler) {
    console.log('\nStart compressing...\n');
    const onEnd = async () => {
      await this.start();
      console.log('Compression complete!\n')
    };

    // 在构建完成后打包
    compiler.hooks.afterEmit.tapPromise('ArchiveWebpackPlugin', onEnd);
  }
}

export default ArchiveWebpackPlugin;
