class TaskQueue {
  constructor(threshold, run = false) {
    this.QUEUE = [];
    this.isPaused = run;
    this.QUEUE_OVERFLOW = [];
    this.THRESHOLD_POINT = +threshold;
    return this;
  }
  _log(...args) {
    if(this.isLogsEnabled) {
      console.log(...args);
    }
  }
  enableLogs() {
    this.isLogsEnabled = true;
  }
  disableLogs() {
    this.isLogsEnabled = false;
  }
  insert(fn) {
    if (typeof fn === 'function') {
      if (this.THRESHOLD_POINT && this.QUEUE.length === this.THRESHOLD_POINT) {
        this._log('TQ - OVERLOAD THRESHOLD', this.THRESHOLD_POINT, 'ADDING TO LINE UP', Date.now());
        this.QUEUE_OVERFLOW.push(fn);
        this._run();
        return;
      }
      this._log('TQ - INSERT INTO MAIN QUEUE', Date.now())
      this.QUEUE.push(fn);
      this._run();
    }
  }
  add(fn) {
    this.insert(fn);
  }
  pause() {
    this.isPaused = true;
  }
  process() {
    this._run(true);
  }
  _run(flag) {
    if (flag) {
      this.isPaused = false;
    }
    if (!this.isPaused) {
      this._execute();
    }
  }
  _execute() {
    const popped = this.QUEUE.shift();
    if (popped) {
      popped(() => {
        const fill = this.QUEUE_OVERFLOW.shift();
        if (fill) {
          this._log('TQ - MOVE FROM LINE UP TO MAIN QUEUE', Date.now());
          this.QUEUE.push(fill);
        }
        this._run();
      });
    } else {
      this._log('TQ - QUEUE IS CLEAR NOW', Date.now());
    }
  }
}

module.exports = TaskQueue;
