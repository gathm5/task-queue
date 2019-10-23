module.exports = () => {
  let pause = false,
    running = false;
  const tasks = [],
    execute = () => {
      if (running || pause) return;
      running = true;
      const task = tasks.shift();
      if (task)
        task(() => {
          running = false;
          execute();
        });
    };
  return Object.freeze({
    pause: () => (pause = true),
    resume: () => {
      pause = false;
      execute();
    },
    add: fn => {
      if (typeof fn !== 'function') throw new Error('Provide a callback function');
      tasks.push(fn);
      execute();
    }
  });
};
