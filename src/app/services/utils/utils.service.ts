import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  ActionSheetController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    private alrtCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  public async presentAlert(data): Promise<void> {
    const alert = await this.alrtCtrl.create({
      header: data.header || '',
      subHeader: data.subHeader || '',
      message: data.message || '',
      buttons: data.buttons || [
        {
          text: 'OK',
          role: 'cancel',
          color: 'secondary',
          fill: 'outline'
        }
      ],
      cssClass: data.cssClass || '',
      backdropDismiss: data.backdropDismiss || true,
      inputs: data.inputs || [],
      mode: data.mode || 'md'
    });

    await alert.present();
    if (data.dismiss) {
      setTimeout(() => {
        alert.dismiss();
      }, data.dismiss);
    }
  }

  public async presentToast(data): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: data.message || '',
      duration: data.duration || 0,
      position: data.position || 'top',
      cssClass: data.cssClass || 'custom-toast',
      color: data.color || ''
    });
    await toast.present();
    if (!data.duration) {
      setTimeout(() => {
        toast.dismiss();
      }, 4000);
    }
  }

  public async presentLoading(data): Promise<void> {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: data.message || null,
      duration: data.duration || 0,
      showBackdrop: data.showBackdrop || true,
      spinner: data.spinner || 'bubbles'
    });

    await loading.present();
  }

  public async presentActionSheet(data): Promise<void> {
    const actionCtrl = await this.actionSheetCtrl.create({
      buttons: data.buttons || [{}],
      header: data.header || null,
      subHeader: data.subHeader || null,
      backdropDismiss: data.backdropDismiss || true
    });
    await actionCtrl.present();
  }
}
