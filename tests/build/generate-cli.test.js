const mock = require('mock-require');
const cli = require('mock-cli');

function runCli(test, args, generateFn, errorHandler) {

    const uncaughtExceptionListeners = process.listeners('uncaughtException');
    process.removeAllListeners('uncaughtException');

    const beforeExitListeners = process.listeners('beforeExit');
    process.removeAllListeners('beforeExit');

    let kill;

    return new Promise((resolve, reject) => {

        mock('../../build/generate', generateFn || (() => {}));

        kill = cli(args, undefined, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(result);
        });

        mock.reRequire('../../build/generate-cli');

    }).catch(errorHandler || (() => {})).then(() => {
        mock.stop('../../build/generate');
        test.done();
        kill();
        uncaughtExceptionListeners.forEach(listener => process.on('uncaughtException', listener));
        beforeExitListeners.forEach(listener => process.on('beforeExit', listener));
    });

}


module.exports = {

    'test outdir & proto file': test => {
        test.expect(3);
        runCli(test, ['-o', 'protoOut/', '-p', 'in.proto'], (outDir, protoFile, protoRoot) => {
            test.equals(outDir, 'protoOut/', 'Should pass correct outdir to generate function');
            test.equals(protoFile, 'in.proto', 'Should pass correct protoFile to generate function');
            test.equals(protoRoot, undefined, 'Should pass correct protoFile to generate function');
        });
    },

    'test outdir & proto file & proto root': test => {
        test.expect(3);
        runCli(test, ['-o', 'protoOut/', '-p', 'in.proto', '-r', 'proto/'], (outDir, protoFile, protoRoot) => {
            test.equals(outDir, 'protoOut/', 'Should pass correct outdir to generate function');
            test.equals(protoFile, 'in.proto', 'Should pass correct protoFile to generate function');
            test.equals(protoRoot, 'proto/', 'Should pass correct protoFile to generate function');
        });
    },


    'test no outdir': test => {
        test.expect(1);
        runCli(test, ['-p', 'in.proto', '-r', 'proto/'], undefined, err => {
            test.notEqual(err, undefined, 'Script should fail');
        });
    },

    'test no protoFile': test => {
        test.expect(1);
        runCli(test, ['-o', 'protoOut/', '-r', 'proto/'], undefined, err => {
            test.notEqual(err, undefined, 'Script should fail');
        });
    }

};
