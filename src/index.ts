import Optional from 'typescript-optional';

declare global {
  interface Promise<T> {
    peek(resolve: (result: T) => void, reject?: (error: Error) => void): Promise<T>;
  }
}

Promise.prototype.peek = function<T>(resolve: (result: T) => void, reject?: (error: Error) => void) {
  return Optional.ofNonNull(resolve)
    .map(res =>
      this.then((result: T) => {
        res(result);
        return result;
      })
    )
    .map(promise => {
      return Optional.ofNullable(reject)
        .map(rej => {
          return promise.catch((error: Error) => {
            rej(error);
            throw error;
          });
        })
        .orElse(promise);
    })
    .get();
};
