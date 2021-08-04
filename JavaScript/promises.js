https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

// The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"

// For example, the following code races two Promises. The second one resolves sooner, and the result of the other one is discarded:
const p1 = new Promise((res) => setTimeout(() => res("p1"), 1000));
const p2 = new Promise((res) => setTimeout(() => res("p2"), 500));

const result = await Promise.race([p1, p2]);
// result = p2

// Similarly, it works for rejections also. If the winning Promise is rejected, the race is rejected:
const p1 = new Promise((res) => setTimeout(() => res("p1"), 1000));
const p2 = new Promise((_r, rej) => setTimeout(() => rej("p2"), 500));

try {
  const result = await Promise.race([p1, p2]);
} catch (e) {
  // e = p2
}
