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
        this._run();
        return;
      }
      this.QUEUE.push(fn);
      this._run();
    }
  }
  add(fn) {
    this.insert(fn);
  }
  _run() {
    if (!this.isExecuting) {
      this._execute();
    }
  }
  _execute() {
    const popped = this.QUEUE.shift();
    if (popped) {
      popped(() => {
        const fill = this.QUEUE_OVERFLOW.shift();
        if (fill) {
          this.QUEUE.push(fill);
        }
      });
      this._run();
    }
  }
}

module.exports = TaskQueue;