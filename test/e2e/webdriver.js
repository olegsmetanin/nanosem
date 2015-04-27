import assert from 'assert';

describe('my webdriverio tests', function(){

    this.timeout(99999999);
    var client = {};

    before(function(done){
            client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
            client.init(done);
    });

    it('Github test',function(done) {
        client
            .url('http://oleg.smetan.in/learningcards/#/cards/adding/1105238241')
            .waitForExist('.input_wrap')
            .setValue('(//div[contains(@class, \'input_wrap\')])[1]//input', '10')
            .click('//a[text()="Review"]')
            .waitForExist('.questions_answer')
            .getHTML('(//div[contains(@class, \'questions\')]//div[contains(@class, \'row\')])[1]//div[contains(@class, \'right\')]//div[contains(@class, \'questions_answer\')]', (err, text) => {
                assert.equal(undefined, err);
                assert.notStrictEqual(text, null)
            })
            .call(done);
    });

    after(function(done) {
        client.end(done);
    });
});