import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoAbaout } from '../interfaces';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  private _http = inject(HttpClient);

  constructor() {}

  public cargarInfo(): Observable<InfoPagina> {
    return this._http.get<InfoPagina>('/data/data-pagina.json')
  }

  public cargarEquipo(): Observable<InfoAbaout[]> {
    return this._http.get<InfoAbaout[]>('https://angular-html-492d1-default-rtdb.firebaseio.com/equipo.json')
  }

}
