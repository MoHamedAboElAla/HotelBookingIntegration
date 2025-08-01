import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { PlatformService } from './platform.service'; 
import { HttpHeaders } from '@angular/common/http';



export interface ProfileDto {
  name: string;
  email: string;
  phoneNumber: string;
  commercialRegister: string;
  taxVisa: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7235/api/Account';

  constructor(private http: HttpClient, private platform: PlatformService) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (this.platform.isBrowser()) {
          localStorage.setItem('token', res.token);
          const decoded: any = jwtDecode(res.token);
          const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
          if (name) {
            localStorage.setItem('userName', name);
          }
          const agentId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        if (agentId) {
          localStorage.setItem('agentId', agentId);
        }
        }
      })
    );
  }

  register(data: {
    name: string;
    email: string;
    phoneNumber: string;
    commercialRegister: string;
    password: string;
    passwordConfirmation: string;
    taxVisa: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    if (this.platform.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    }
  }

  isLoggedIn(): boolean {
    return this.platform.isBrowser() && !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    if (this.platform.isBrowser()) {
      const token = localStorage.getItem('token');
      if (!token) return null;
      try {
        const decoded: any = jwtDecode(token);
        return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      } catch {
        return null;
      }
    }
    return null;
  }

  getUserName(): string | null {
    return this.platform.isBrowser() ? localStorage.getItem('userName') : null;
  }


getProfile(): Observable<ProfileDto> {
  if (this.platform.isBrowser()) {
    return this.http.get<ProfileDto>(`${this.apiUrl}/Profile`);
  }
  return new Observable<ProfileDto>();
}

updateProfile(profile: ProfileDto): Observable<any> {
  return this.http.put(`${this.apiUrl}/UpdateProfile`, profile);
}

updatePassword(body: { currentPassword: string; newPassword: string }): Observable<any> {
  return this.http.put(`${this.apiUrl}/UpdatePassword`, body);
}

  getUserId(): number | null {
    if (this.platform.isBrowser()) {
      const token = localStorage.getItem('token');
      if (!token) return null;
      try {
        const decoded: any = jwtDecode(token);
        return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      } catch {
        return null;
      }
    }
    return null;
  }

}