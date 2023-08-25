export class UrlQueryParams {
  private params: String = '';

  constructor(obj: any) {
    let count = 0;
    for (const key in obj) {
      if (obj[key] !== undefined
        && obj[key] !== null
        && obj[key] !== 'undefined'
        && obj[key] !== 'null'
      ) {
        if (Array.isArray(obj[key])) {
          for (const item of obj[key]) {
            if (count !== 0) {
              this.params += '&';
            }
            this.params += key;
            this.params += '[]=';
            this.params += item;
            if (obj[key].indexOf(item) < obj[key].length - 1) {
              this.params += '&';
            }
          }
        } else {
          if (count !== 0) {
            this.params += '&';
          }
          this.params += key;
          this.params += '=';
          this.params += obj[key];
        }
        count++;
      }
    }
  }

  toString() {
    return this.params.toString();
  }
}
