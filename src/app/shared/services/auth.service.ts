import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterRenderEffect, HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
// import { Branch } from 'src/app/interfaces/LoginPage';
// import { AppConfig } from 'src/app/class/app-config';
import { Login } from '../class/Login';
import { ApiService } from './api.service';
import { AppConfig } from '../class/app-config';
import { Branch } from 'src/app/shared/interfaces/LoginPage';



import { TokenService } from './token.service';
// import { UserClaimModel } from '../class/Login/user-claim-model';


// [{
// 	"resource": "/D:/WORKING/siraj/RemediEmr/RemediEmr/src/services/auth.service.ts",
// 	"owner": "typescript",
// 	"code": "7016",.................
// 	"severity": 8,
// 	"message": "Could not find a declaration file for module 'crypto-js'. 'd:/WORKING/siraj/RemediEmr/RemediEmr/node_modules/crypto-js/index.js' implicitly has an 'any' type.\n  Try `npm i --save-dev @types/crypto-js` if it exists or add a new declaration (.d.ts) file containing `declare module 'crypto-js';`",
// 	"source": "ts",
// 	"startLineNumber": 4,
// 	"startColumn": 27,
// 	"endLineNumber": 4,
// 	"endColumn": 38
// }]
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Decrypt(encryptedData: string, key: string = this.encryptionpass): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }



  AppConfig = new AppConfig()

  encryptionpass: string = 'tedsystechnologiesekm'

  encrypted: string = '';
  decryptedData: string = '';
  dataToEncrypt: string = '';
  encryptedData: string = '';

  secretkey: string = 'tedsystechnologies'
  constructor(
    private router: Router,
    private http: HttpClient,
    private apiSerice: ApiService,
    private toastc: ToastController,
    private loadingController: LoadingController,
    private apiService: ApiService,
    private tokenService: TokenService
  ) {

    this.secretkey = 'tedsystechnologies'
    this.dataToEncrypt = ''
    this.encryptedData = ''
    this.decryptedData = ''
    this.encrypted = ''
  }


  logOutMethod() {



    this.router.navigate(['login'])


  }

  async loginCheck(log: Login) {
    const endpoint = 'auth/login';
    return await this.apiSerice.post(endpoint, log)

  }

  
   getSectionOfUser(log: Login) {
    const endpoint = 'auth/sections-of-user';
    return  this.apiSerice.post(endpoint, log)

  }

   GetAllTokenClaims() {
    const endpoint = 'common/token-claims';
    // 
    return  this.apiSerice.get(endpoint)

  }
  //   LoginCheck(Username: string, password: string) {

  //   let cred = {
  //     UserName: Username,
  //     Password: password,


  //   }

  //   return this.apiService.post(endpoint, cred)

  // }

  async getAllSections() {
    let endpoint = 'lookup/sections'
    return await this.apiSerice.get(endpoint)

  }

  async CheckBranchAvailable(): Promise<{ Status: number; Data?: Branch; Message?: string }> {
    if (localStorage.getItem('RemediEmrBranch')) {
      let decrypted = JSON.parse(`${localStorage.getItem('RemediEmrBranch')}`);
      if (decrypted != null) {
        // let data: Branch;
        let data = this.Decrypt(decrypted);
        console.log(data);


        return { Status: 200, Data: data };
      } else {
        return { Status: 400, Message: 'decrypted error' };
      }
    } else {
      return { Status: 404, Message: 'Not found' };
    }
  }



  EncryptToken(dataToencrypt: string) {
    // console.log(dataToencrypt,'data to encrypt');

    this.dataToEncrypt = dataToencrypt


    this.encryptedData = CryptoJS.AES.encrypt(this.dataToEncrypt, this.secretkey).toString();
    // console.log(this.encryptedData,"encrypteddata");


    let type = {
      Name: this.encryptedData
    }
    localStorage.setItem('RemediEmrAuth', JSON.stringify(type))
  }

  DecryptToken() {
    if (localStorage.getItem('RemediEmrAuth')) {
      this.encrypted = JSON.parse(`${localStorage.getItem('RemediEmrAuth')}`).Name;
      // console.log(this.encrypted,"encryptedindwecrytoy");

      try {
        let dat = CryptoJS.AES.decrypt(this.encrypted, this.secretkey);
        this.decryptedData = dat.toString(CryptoJS.enc.Utf8);
        // this.decryptedData = CryptoJS.AES.decrypt(this.encrypted, this.secretkey).toString(CryptoJS.enc.Utf8);
        // console.log(this.decryptedData);

        if (this.decryptedData) {
          return this.decryptedData;
        } else {
          // Handle the case where decryption failed or resulted in an empty string.
          console.error('Decryption failed or resulted in an empty string.');
          return null;
        }
      } catch (error) {
        // Handle decryption errors
        console.error('Error during decryption:', error);
        return null;
      }
    } else {
      this.LogOutMethod()
      this.router.navigate(['login']);
      return null;
    }
  }




  encrypt(data: any, key: string = this.encryptionpass): string {
    const stringData = JSON.stringify(data); // Convert the data to a string
    return CryptoJS.AES.encrypt(stringData, key).toString();
  }

  // Decryption
  decrypt(encryptedData: string, key: string = this.encryptionpass): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  LogOutMethod() {


    localStorage.removeItem('RemediEmrAuth')
    // localStorage.removeItem('Branch')
    // localStorage.removeItem('Level')
    // localStorage.removeItem('Room')
    // localStorage.removeItem('Doctor')
    // localStorage.removeItem('Section')
    this.router.navigate(['login'])


  }
  async getAlltabs() {
    let endpoint = 'remediemr/tabs'
    return await this.apiSerice.get(endpoint)

  }

  async getAllcctabs() 
{
  let endpoint = 'ccmodule/cctabs'
  return await this.apiSerice.get(endpoint)

}

  Logoutfn() {

    this.apiService.LogOutMethod()

  }


  // encrypt(data: any, key: string=this.encryptionpass): string {
  //   const stringData = JSON.stringify(data); // Convert the data to a string
  //   return CryptoJS.AES.encrypt(stringData, key).toString();
  // }

  // Decryption
  // decrypt(encryptedData: string, key: string=this.encryptionpass): any {
  //   const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  //   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // }


}
