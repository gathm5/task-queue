const allowNext = (fn) => {
  if (typeof fn !== 'function') throw new Error();
};

const Queue = () => {
  let pause = false;
  let running = false;
  const tasks = [];
  const execute = () => {
    if (running) return;
    running = true;
    const task = tasks.shift();
    if (task) {
      task(() => {
        running = false;
        if (!pause) {
          execute();
        }
      });
    }
  };
  return Object.freeze({
    add: (fn) => {
      allowNext(fn);
      tasks.push(fn);
      execute();
    },
    pause: () => { pause = true; },
    resume: () => {
      pause = false;
      execute();
    },
  });
};

module.exports = Queue;
