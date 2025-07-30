// src/app/services/platform.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}