module.exports = {

    testInit(test) {

        const generate = require('../../build/generate');
        try {
            generate();
        }
        catch(e) {
            console.log(e);
        }
        test.done();

    }

}