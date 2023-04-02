const url = "https://jsonplaceholder.typicode.com/"

export default class Http {
  static get<T>(): Promise<T> {
    return fetch(url).then((response) =>
      response.json()
    );
  };

  static post(data: any) {
  };
};
