import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
 constructor(private toastCtrl: ToastController) {}

  async showToast(message: string, color: string = 'primary', duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: color,
      position: 'top'
    });

    await toast.present();
  }

}
