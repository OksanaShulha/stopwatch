// https://javascript.info/settimeout-setinterval

// setInterval allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.

// The setInterval method has the same syntax as setTimeout:

let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
// All arguments have the same meaning. But unlike setTimeout it runs the function not only once, but regularly after the given interval of time.

// To stop further calls, we should call clearInterval(timerId).

// The following example will show the message every 2 seconds. After 5 seconds, the output is stopped:

// repeat with the interval of 2 seconds
let timerId = setInterval(() => alert('tick'), 2000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
