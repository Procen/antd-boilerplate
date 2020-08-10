import { ResponseProcessor } from './responseProcessor';
import progressStore from 'stores/progress';

export const request = () => {

  return (target: any, propertyKey: string, descriptor: any): any => {
    var oldValue = descriptor.value;

    descriptor.value = async function(...args: any) {
      try {
        const response = await oldValue.call(this, ...args);
        (new ResponseProcessor({ response })).process();
        return response;
      } catch (e) {
        (new ResponseProcessor({ response: e.response })).process();
        return e.response;
      }
    };

    return descriptor;
  }
}

export function action(reqArgs: { action: string, minRequestTime?: number, writeError?: boolean }) {
  reqArgs = { ...reqArgs, writeError: true };

  return function(target: any, propertyKey: string, descriptor: any): any {
    var oldValue = descriptor.value;
    console.log("returnfunction -> oldValue", oldValue)

    descriptor.value = async function(...args: any) {
      const action = reqArgs.action;

      progressStore.log(action, 'progress');
      // errorsStore.clearError(action);

      const requestStartTime: Date = new Date();

      const status = await oldValue.call(this, ...args);

      let logStatus: any = 'completed';
      if (status === false || logStatus === true) {
        logStatus = !!status ? 'completed' : 'failed';
      }

      let timeProgressParams = undefined;

      if (reqArgs.minRequestTime) {
        const minRequestTime: number =  reqArgs.minRequestTime;
        timeProgressParams = {
          requestStartTime,
          minRequestTime
        };
      }

      progressStore.log(action, logStatus, timeProgressParams);
      return status;
    };

    return descriptor;
  };
}

