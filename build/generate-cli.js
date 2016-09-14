#!/usr/bin/env node

const {version} = require('../package.json');
const generate = require('./generate');
const yargs = require('yargs');

const options = yargs
    .usage('Protobuf flowtype generator')
    .help('help')
    .version(version)
    .wrap(null)
    .options({
        outDir: {
            alias: 'o',
            describe: 'Specifies the directory to output the generated flowtype packages to'
        },
        protoFile: {
            alias: 'p',
            describe: 'Specifies the index proto file to generate from'
        },
        protoRoot: {
            alias: 'r',
            describe: 'Specifies the root directory to load proto files from'
        }
    })
    .alias('help', 'h')
    .alias('version', 'v')
    .check(function(args) {
        if (!args.outDir) {
            return 'Must specify an outDir';
        }

        if (!args.protoFile) {
            return 'Must specify a protoFile';
        }

        return true;
    })
    .parse(process.argv);

generate(options.outDir, options.protoFile, options.protoRoot);
