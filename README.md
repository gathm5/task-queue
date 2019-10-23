### Installation
Install via npm
```
npm i https://github.com/gathm5/task-queue.git
```

### How to use
```
const Queue = require('task-queue');
```

Create an instance of the queue

```
const queue = Queue();
```
`queue` will allow you to run 1 task at a time

### Add task functions
```
// Task 1
queue.add((done) => {
  console.log('Task A');
  done(); // Call done() to release the lock for the next task in line
});

// Task 2
queue.add((done) => {
  console.log('Task B');
  done(); // Call done() to release the lock for the next task in line
});
```

### PS: `done()` should be called inside the `queue.add(cb)` callback function.

### Options

Pause the queue
```
queue.pause();
```

Resume paused queue
```
queue.resume();
```