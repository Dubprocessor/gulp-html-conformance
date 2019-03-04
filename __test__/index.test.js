jest.mock('fs');
jest.mock('../src/lib/logger/logger');
jest.mock('child_process', () => ({
  exec: jest.fn(() => new Promise())
}));

const { PassThrough } = require('stream');
const File = require('vinyl');
const index = require('../src/index');
const opts = require('./fixtures/options');

describe('index', () => {
  const buffer = Buffer.from('<!DOCTYPE> <html></html>');

  test('should return expected value if file.contents is buffer', done => {
    expect.assertions(2);
    const fakeFile = new File({
      contents: buffer
    });
    const result = index(opts);
    result.write(fakeFile);

    expect(Object.getPrototypeOf(result).constructor.name).toBe('DestroyableTransform');
    expect(result._transformState.writechunk.contents.toString()).toBe(buffer.toString());
    done();
  });

  test('should emit error if file.contents is stream', done => {
    expect.assertions(1);
    const fakeStream1 = new PassThrough();
    const fakeStream2 = new PassThrough({ objectMode: true });
    const fakeFile = new File({
      contents: fakeStream1
    });
    fakeStream1.write(buffer);
    fakeStream2.write(fakeFile);

    fakeStream2.pipe(index(opts)).on('error', error => {
      expect(error.message).toBe('Stream is not supported!');
    });

    fakeStream2.end(done);
  });
  test('should pass file if file.contents is null', done => {
    expect.assertions(1);
    const fakeStream = new PassThrough({ objectMode: true });
    const fakeFile = new File({
      contents: null
    });
    fakeStream.write(fakeFile);

    fakeStream.pipe(index(opts)).on('data', file => {
      expect(file.isNull()).toBe(true);
    });

    fakeStream.end(done);
  });
  test('should not throw if options object is not provided', done => {
    expect.assertions(1);
    index();
    expect(index).not.toThrow();
    done();
  });
});
