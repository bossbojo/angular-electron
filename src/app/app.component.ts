import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular && Electron';
  Maximize: Boolean = true;
  constructor(private _electronService: ElectronService) {
    this.playPingPong();
  }
  public playPingPong() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('ping', 'ping');
      this._electronService.ipcRenderer.on('count', (event: any, arg: any) => {
        console.log(arg);
      });
    }
  }
  OnMinimizeWindow() {
    if (this._electronService.isElectronApp) {
      const window = this._electronService.remote.BrowserWindow.getFocusedWindow();
      window.minimize();
    }
  }
  OnMaximizeWindow() {
    if (this._electronService.isElectronApp) {
      const window = this._electronService.remote.BrowserWindow.getFocusedWindow();
      window.isMaximized() ? window.unmaximize() : window.maximize();
      this.Maximize = !this.Maximize;
    }
  }
  OnCloseScreen() {
    if (this._electronService.isElectronApp) {
      const window = this._electronService.remote.BrowserWindow.getFocusedWindow();
      window.close();
    }
  }
}

