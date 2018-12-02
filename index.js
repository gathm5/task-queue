class TaskQueue {
  constructor(threshold) {
    this.QUEUE = [];
    this.isExecuting = false;
    this.QUEUE_OVERFLOW = [];
    this.THRESHOLD_POINT = +threshold;
  }
  insert(fn) {
    if (typeof fn === 'function') {
      if (this.THRESHOLD_POINT && this.QUEUE.length === this.THRESHOLD_POINT) {
        this.QUEUE_OVERFLOW.push(fn);
        this.run();
        return;
      }
      this.QUEUE.push(fn);
      this.run();
    }
  }
  run() {
    if (!this.isExecuting) {
      this.execute();
    }
  }
  execute() {
    const popped = this.QUEUE.shift();
    if (popped) {
      popped();
      const fill = this.QUEUE_OVERFLOW.shift();
      if (fill) {
        this.QUEUE.push(fill);
      }
      this.run();
    }
  }
}