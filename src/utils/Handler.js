/**
 * Because we can't try catch along with async await, we need to wrappe the 
 * promise in another promise.
 * 
 * @date    15/02/2020
 * @author  jrb <jrb.youssef@gmail.com>
 */
module.exports = (promise) => {
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));
}