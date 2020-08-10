// @flow
// import type { AxiosResponse } from 'types';
// import { errorsStore, sessionStore } from 'stores';
import sessionStore from 'stores/login';

class ResponseProcessor {
  response: any

  constructor(params: any) {
    const { response }: { response: any} = params;
    this.response = response;
  }

  async process() {
    if (!this.response) {
      console.error('Provided invalid response object, response processing will not be poerformed');
      return;
    }
    try {
      this.processByStatus();
    } catch (e) {
      console.error(e);
    }
  }

  processByStatus(): void {
    switch (this.response.status) {
      case 422:
        return;
      case 401:
        this.handleUnauthorized();
        return;
      case 404:
        return;
      case 403:
        return;
      case 500:
        console.error('Internal server error', this.response);
        return;
      case 502:
        return;
      default:
        return;
    }
  }

  handleUnauthorized() {
    sessionStore.logout();
  }
}

export { ResponseProcessor };
