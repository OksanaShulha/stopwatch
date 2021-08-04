// setTimeout allows us to run a function once after the interval of time.
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)


// With Promise.race, it’s easy to implement a timeout that supports any Promises. Along with the async task, start another Promise that rejects when the timeout is reached. Whichever finishes first (the original Promise or the timeout) will be the result.

const timeout = (prom, time) =>
Promise.race([prom, new Promise((_r, rej) => setTimeout(rej, time))]);
// With this helper function, wrap any Promise and it will reject if it does not produce a result in the specified time.

// resolves in 500 ms
const fn = async () => {
await new Promise((res) => setTimeout(res, 500));
return "p2";
};

// finishes before the timeout
const result = await timeout(fn(), 1000);
// result = p2

// timeouts in 100 ms
await timeout(fn(), 100);
// error

// The above solution uses a setTimeout call to schedule the rejection. Just as the original Promise does not terminate when the timeout is reached, the timeout Promise won’t cancel this timer when the race is finished.

// While this does not change how the resulting Promise works, it can cause side-effects. The event loop needs to check whether the timer is finished, and some environments might work differently if there are unfinished ones.

// Let’s make the wrapper function use Promise.finally to clear the timeout!

const timeout = (prom, time) => {
let timer;
return Promise.race([
    prom,
    new Promise((_r, rej) => (timer = setTimeout(rej, time))),
]).finally(() => clearTimeout(timer));
};
