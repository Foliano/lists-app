import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListManageService } from 'src/app/services/list-manage/list-manage.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage {
  @ViewChild('form') form: NgForm;

  public hideNotDone = false;

  public list = {
    title: '',
    id: null,
    items: []
  };

  public newElement = {
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private router: Router,
    private listManageService: ListManageService
  ) {}

  ionViewWillEnter(): void {
    this.getList();
  }

  ionViewWillLeave(): void {
    this.listManageService.setActiveIndex = -1;
  }

  private async getList(): Promise<void> {
    if (!this.route.snapshot.params.id) {
      this.goToMainPage();
    }
    const list = await this.listManageService.getListByIndex(
      String(this.route.snapshot.params.id)
    );
    if (!list) {
      this.goToMainPage();
    }
    this.list = list;
  }

  private goToMainPage(): void {
    this.router.navigateByUrl('/');
  }

  public addElement(): void {
    if (this.form.form.status === 'INVALID') {
      this.utilsService.presentAlert({ message: 'Uzupełnij nazwę elementu!' });
      return;
    }
    this.list.items.push({
      name: this.newElement.name,
      checked: false
    });
    this.form.reset();
    this.saveItems();
  }

  public saveItems(): void {
    this.listManageService.saveList(
      this.list,
      String(this.route.snapshot.params.id)
    );
  }

  public deleteItem($event: any, i: number): void {
    $event.stopPropagation();
    this.list.items.splice(i, 1);
    this.saveItems();
  }

  public deleteList(): void {
    const buttons = [
      {
        text: 'Anuluj',
        role: 'cancel'
      },
      {
        text: 'Usuń',
        handler: () => {
          this.sendDeleteList();
        }
      }
    ];
    this.utilsService.presentAlert({
      message: 'Czy na pewno chcesz usunąć całą listę?',
      buttons
    });
  }

  private sendDeleteList(): void {
    this.listManageService.deleteList(String(this.route.snapshot.params.id));
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
