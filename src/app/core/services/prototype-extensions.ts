/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Array<T> {
    distinct(fn?: (element: T) => unknown): Array<T>;
    delete(element: T): T;
    delete(fn: (element: T) => boolean): T;
    deleteAt(index: number): T;
    deleteAll(fn: (element: T) => boolean): Array<T>;
    setToString(fn: (element: T) => string): Array<T>;
  }

  // interface Object {
  //   log(): void;
  // }

  interface ObjectConstructor {
    deepClone(object: any): any;
    deepFreeze(object: any): void;
  }
}

Array.prototype.distinct = function (fn?: (element: unknown) => unknown): Array<unknown> {
  if (fn) {
    return this.filter((value: unknown, index: number, self: Array<unknown>) => {
      return self.findIndex((item) => fn(item) === fn(value)) === index;
    });
  }
  return this.filter((value: unknown, index: number, self: Array<unknown>) => {
    return self.indexOf(value) === index;
  });
};

Object.deepClone = function (input: any): any {
  if (!input) return input;
  const output: any = Object.assign(Array.isArray(input) ? [] : {}, input);
  for (const key in output) {
    if (typeof input[key] === "object") {
      output[key] = output[key].deepClone();
    }
  }
  return output;
};

Object.deepFreeze = function (input: any): void {
  Object.freeze(input);
  for (const key in input) {
    if (typeof input[key] === "object") {
      Object.deepFreeze(input[key]);
    }
  }
};

Array.prototype.deleteAt = function (index: number): unknown {
  if (index < 0) return undefined;
  const deleted: unknown = this.splice(index, 1)?.[0];
  return deleted;
};

Array.prototype.delete = function (input: unknown | ((element: unknown) => boolean)): unknown {
  let index: number;
  if (typeof input === "function") {
    index = this.findIndex((item) => input(item));
  } else {
    index = this.indexOf(input);
  }
  const deleted: unknown = this.deleteAt(index);
  return deleted;
};

Array.prototype.deleteAll = function (fn: (element: unknown) => boolean): Array<unknown> {
  const deleted: Array<unknown> = [];
  for (let i = this.length - 1; i >= 0; i--) {
    if (fn(this[i])) {
      deleted.push(this.deleteAt(i));
    }
  }
  return deleted;
};

// Object.prototype.log = function () {
//   console.log(
//     new Date().toLocaleTimeString(navigator.language, {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     }),
//     this,
//   );
// };

Array.prototype.setToString = function (fn: (element: unknown) => string) {
  return this.map((element: unknown) => {
    return Object.assign(element, { toString: () => fn(element) });
  });
};

export {};
