import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { ProductosIdx } from '../../interfaces';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export default class SearchComponent implements OnInit {

  private _productosService = inject(ProductosService);
  private _route = inject(ActivatedRoute);
  public paramSignal = toSignal(this._route.params.pipe(map(params => params['termino'])));
  public productos = signal<ProductosIdx[]>([]);
  public cargando = signal<boolean>(true);

  constructor() {

   }

  ngOnInit(): void {
    this._route.params.pipe(
      map( params => params['termino'] ),
      switchMap( termino => {
        return this._productosService.cargarProductos().pipe(
          map( productos => {
            if( termino.lenght === 0 ) return productos;
            return productos.filter( producto => {
              const encontradoPorCategoria = (producto.categoria?.toLowerCase() ?? '').indexOf(termino.toLowerCase()) >= 0;
              const encontradoPorTitulo = (producto.titulo?.toLowerCase() ?? '').indexOf(termino.toLowerCase()) >= 0;
              return encontradoPorCategoria || encontradoPorTitulo;
            } )
          })
        )
      }),
    ).subscribe(
      resp => {
        this.productos.set(resp);
        this.cargando.set(false)
      }
    )

  }



}
