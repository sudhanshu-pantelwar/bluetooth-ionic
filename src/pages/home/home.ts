import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;
  status: any;
  static Blue: any;
  constructor(public loadingCtrl: LoadingController, private bluetoothSerial: BluetoothSerial, public navCtrl: NavController) {
    HomePage.Blue = this;
  }

  
  communications(){
      this.startLoading();
      this.bluetoothSerial.enable().then((data) => {
        setInterval(function() {
           HomePage.Blue.bluetoothSerial.isConnected().then((data)=>{
            document.getElementById("p1").innerHTML = "Status: connected";
            console.log(status);
          }).catch((data)=> {
            document.getElementById("p1").innerHTML = "Status: disconnected";
            this.status = "disconnected";
            console.log(status);
          })
        }, 1000);
        this.bluetoothSerial.connectInsecure('20:16:01:11:76:22').subscribe((data) => {
          this.status = "connected";
          alert("Connection Successfull");
          this.dismissLoading();
        })
      }).catch((e) => {
        alert(e);
      })
    }

  startLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }
  
  sendCommand(msg){
    console.log(msg);
    this.bluetoothSerial.write(msg).then((data) => {
      
      // alert("2 "+data);
    }).catch((err)=>{
      alert(err);
    })
  }
}
