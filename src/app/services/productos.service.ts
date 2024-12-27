import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Productos, ProductosIdx } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _http = inject(HttpClient);

  constructor() { }

  public cargarProductos(): Observable<ProductosIdx[]> {
    return this._http.get<ProductosIdx[]>('https://angular-html-492d1-default-rtdb.firebaseio.com/productos_idx.json')
  }

  public getProducto(id: string): Observable<Productos> {
    return this._http.get<Productos>(`https://angular-html-492d1-default-rtdb.firebaseio.com/productos/${id}.json`);
  }
}
