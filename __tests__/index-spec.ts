import '../src/index';
test('Should augment Promise with peek', () => {
  expect(Promise.prototype.peek).toBeTruthy();
});

describe('Promise.prototype.peek(resolve)', () => {
  const payload = 'payload';
  const resolvedPromise = new Promise(resolve => resolve(payload));
  const error = 'error';
  const rejectedPromise = new Promise((resolve, reject) => reject(error));
  let spyResolve;
  beforeEach(() => {
    spyResolve = jest.fn();
  });

  it('should peek at resolved value without interfering', done => {
    resolvedPromise.peek(spyResolve).then(result => {
      expect(spyResolve).toBeCalledWith(payload);
      expect(result).toBe(payload);
      done();
    });
  });

  it('should not interfere with rejected value', done => {
    rejectedPromise.peek(spyResolve).catch(e => {
      expect(e).toBe(error);
      done();
    });
  });
});

describe('Promise.prototype.peek(resolve, reject)', () => {
  const payload = 'payload';
  const resolvedPromise = new Promise(resolve => resolve(payload));
  const error = 'error';
  const rejectedPromise = new Promise((resolve, reject) => reject(error));
  let spyResolve;
  let spyReject;
  beforeEach(() => {
    spyResolve = jest.fn();
    spyReject = jest.fn();
  });

  it('should peek at resolved value without interfering', done => {
    resolvedPromise.peek(spyResolve, spyReject).then(result => {
      expect(spyResolve).toBeCalledWith(payload);
      expect(spyReject).not.toBeCalled();
      expect(result).toBe(payload);
      done();
    });
  });

  it('should not interfere with rejected value', done => {
    rejectedPromise.peek(spyResolve, spyReject).catch(e => {
      expect(spyResolve).not.toBeCalled();
      expect(spyReject).toBeCalledWith(error);
      expect(e).toBe(error);
      done();
    });
  });
});
