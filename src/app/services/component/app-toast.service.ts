import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {
    toasts: any[] = [];
    
    show(header: string, body: string, options: any = {}) {
        this.toasts.push({ header, body, ...options  });
    }

    remove(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
      }
}
