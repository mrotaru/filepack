 var program = require('commander');

 program
  .version('0.0.1')
//  .command('install [name]', 'install pack')
  .command('make [folder]', 'make pack')
//  .command('check [pack]', 'check pack, hash each file')
//  .command('quickcheck [pack]', 'quick check pack - hashes not checked')
//  .command('list', 'list installed packages', {isDefault: true})
  .parse(process.argv);
