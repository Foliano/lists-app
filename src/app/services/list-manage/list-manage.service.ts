import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ListManageService {
  private lists = [
    {
      title: 'Zobacz przykład',
      opis: 'Przykładowy opis',
      icon: 'food',
      id: null
    }
  ];
  private lists$ = new BehaviorSubject([]);
  private activeIndex$ = new Subject();
  constructor(private storageService: StorageService) {}

  public async getLists(): Promise<void> {
    const lists = await this.storageService.getItem('lists');
    if (lists) {
      this.lists = lists;
    }
    this.lists$.next(this.lists);
  }

  public addNewList(newList): void {
    this.lists.push(newList);
    this.storageService.setItem({ key: 'lists', value: this.lists });
    this.lists$.next(this.lists);
  }

  public saveList(list: any, id: string): void {
    const index = this.getListIndex(id);
    if (index < 0) {
      return;
    }
    this.lists[index] = list;
    this.storageService.setItem({ key: 'lists', value: this.lists });
  }

  private getListIndex(id: string): number {
    const index = this.lists.findIndex((list) => {
      return String(list.id) == id;
    });
    return index;
  }

  public getListByIndex(id: string): any {
    const index = this.getListIndex(id);
    if (index < 0) {
      return false;
    }
    this.activeIndex$.next(index);
    return this.lists[index];
  }

  public get getLists$(): Observable<any[]> {
    return this.lists$;
  }

  public get getActiveIndex$(): Observable<unknown> {
    return this.activeIndex$;
  }

  public set setActiveIndex(num: number) {
    this.activeIndex$.next(num);
  }

  public deleteList(id: string): void {
    const index = this.getListIndex(id);
    if (index < 0) {
      return;
    }
    this.lists.splice(index, 1);
    this.storageService.setItem({ key: 'lists', value: this.lists });
    this.lists$.next(this.lists);
  }
}
