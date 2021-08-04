// The arguments of the Promise.race function are Promises. This makes it work with async functions too:

const fn = async (time, label) => {
  await new Promise((res) => setTimeout(res, time));
  return label;
};

const result = await Promise.race([fn(1000, "p1"), fn(500, "p2")]);
// result = p2
// Just don’t forget to call the async functions so that the race gets Promises. This can be a problem with anonymous functions and those need to be wrapped IIFE-style:

const result = await Promise.race([
  fn(1000, "p1"),
  (async () => {
    await new Promise((res) => setTimeout(res, 500));
    return "p2";
  })(),
]);
// result = p2
