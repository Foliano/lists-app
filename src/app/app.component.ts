import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ListManageService } from './services/list-manage/list-manage.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = -1;
  public appPages = [];
  public labels = [
    { url: '/', name: 'Strona główna' },
    { url: '/add-list', name: 'Dodaj nową listę' }
  ];
  private subs: Subscription[] = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private listManageService: ListManageService
  ) {
    this.initializeApp();
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    const sub1 = this.listManageService.getLists$
      .pipe(
        map((data) => {
          const mapList = data.map((list) => {
            const { title, icon, id } = list;
            return { title, icon, id };
          });
          return mapList;
        })
      )
      .subscribe((pages): void => {
        this.appPages = pages;
      });
    const sub2 = this.listManageService.getActiveIndex$.subscribe((num) => {
      this.selectedIndex = Number(num);
    });
    this.subs.push(sub1);
    this.subs.push(sub2);
    this.listManageService.getLists();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
