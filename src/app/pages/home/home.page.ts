import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListManageService } from 'src/app/services/list-manage/list-manage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  public lists = [];

  private subs: Subscription[] = [];

  constructor(private listManageService: ListManageService) {}

  ngOnInit(): void {
    this.listManageService.getLists$
      .pipe(
        map((data) => {
          const list = data.map((list): {
            title: string;
            description: string;
            id: number;
          } => {
            const { title, description = '', id } = list;
            return { title, description, id };
          });
          return list;
        })
      )
      .subscribe((list) => {
        this.lists = list;
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
