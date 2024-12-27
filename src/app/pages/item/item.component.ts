import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export default class ItemComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _productoService = inject(ProductosService);
  public _idSignal = toSignal( this._route.params
    .pipe(
      map ( params => params['id'] ) // Transforma el objeto de parámetros en el valor del parámetro `id`
    )
  ); // `toSignal` se suscribe al Observable internamente
  public productoSignal = signal<Productos>({});

  constructor() { }

  ngOnInit(): void {
    this._productoService.getProducto(this._idSignal()).subscribe(
      (resp: Productos) => {
        this.productoSignal.set(resp);
        // console.log(resp)
      }
    );
  }

}
