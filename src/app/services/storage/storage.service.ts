import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public async setItem(getItem: { key: string; value }): Promise<any> {
    getItem.value = JSON.stringify(getItem.value);
    return await Storage.set(getItem);
  }

  public async getItem(key: string): Promise<any> {
    const { value } = await Storage.get({ key });
    return JSON.parse(value);
  }

  public async removeItem(key: { key: string }): Promise<void> {
    await Storage.remove(key);
  }

  public async keys(): Promise<string[]> {
    const { keys } = await Storage.keys();
    return keys;
  }
}
