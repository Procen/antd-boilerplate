import { action, observable } from 'mobx';

type ProgressType = 'progress' | 'failed' | 'completed';

class Progress {
  @observable
  progress: { [key: string]: { status: ProgressType } } = {};

  log(
    action: string,
    status: ProgressType,
    timeout?: {
      requestStartTime: Date,
      minRequestTime: number
    }
  ) {
    const commit = () => {
      this.commitLog(action, status);
    };

    if (!timeout) {
      commit();
      return;
    }

    const endTime: any = new Date();
    const requestStartTime: any = timeout && timeout.requestStartTime;
    const minRequestTime: any = timeout && timeout.minRequestTime;
    let requestTime = 0;

    if(requestStartTime && endTime) {
      requestTime = (requestStartTime - endTime) / 1000;
    }

    if (requestTime > minRequestTime) {
      commit();
      return;
    }

    setTimeout(() => {
      commit();
    }, minRequestTime - requestTime);
  }

  commitLog(action: string, status: ProgressType) {
    this.progress[action] = { status: status };
  }

  isLoading(key: string): boolean {
    const progress = this.progress[key];
    return !!(progress && progress.status === 'progress');
  }
}

export { Progress }
export default new Progress();
