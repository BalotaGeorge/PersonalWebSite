import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private get localStorage(): Storage {
    return localStorage;
  }

  public set(key: string, value: unknown): void {
    const valueStringifyed: string = JSON.stringify(value);
    this.localStorage.setItem(key, valueStringifyed);
  }

  public get(key: string): unknown {
    const valueStringifyed: string = this.localStorage.getItem(key) as string;
    if (!valueStringifyed) {
      return null;
    }
    const value = JSON.parse(valueStringifyed);
    return value;
  }

  public remove(key: string): unknown {
    const value = this.get(key);
    this.localStorage.removeItem(key);
    return value;
  }

  public clear(): void {
    this.localStorage.clear();
  }
}
