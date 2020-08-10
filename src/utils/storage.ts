class Storage {
  set(item: string, json: {}): boolean {
    try {
      const data = JSON.stringify(json);
      localStorage.setItem(item, data);
      return true;
    } catch (e) {
      return false;
    }
  }

  get(item: string): {} {
    try {
      const data = localStorage.getItem(item);
      if (typeof data === 'string') {
        return JSON.parse(data);
      } else return {}
    } catch (e) {
      return {}
    }
  }

}

const storage = new Storage();

export { Storage, storage };
