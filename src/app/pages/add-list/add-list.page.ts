import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ListManageService } from 'src/app/services/list-manage/list-manage.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss']
})
export class AddListPage implements OnInit {
  @ViewChild('form') form: NgForm;
  private lists = [];

  public newList = {
    title: '',
    icon: 'archive',
    description: '',
    id: null,
    items: []
  };

  constructor(
    private utilsService: UtilsService,
    private router: Router,
    private listManageService: ListManageService
  ) {}

  ngOnInit(): void {
    this.getLists();
  }

  private async getLists(): Promise<void> {
    const lists = await this.listManageService.getLists$.toPromise();
    this.lists = lists || [];
  }

  public async addNewList(): Promise<void> {
    if (this.form.form.status === 'INVALID') {
      this.utilsService.presentAlert({ message: 'Nazwij listę!' });
      return;
    }
    this.newList.id = new Date().getTime();
    await this.listManageService.addNewList({ ...this.newList });
    this.form.reset();
    this.router.navigate([`/list/${this.newList.id}`], { replaceUrl: true });
  }
}
