import { Component, computed, inject, signal } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductosIdx } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css'
})
export default class PortafolioComponent {

  private _servicio = inject(ProductosService);
  public productos = signal<ProductosIdx[]>([]);
  public cargando = signal<boolean>(true);

  constructor() {
    this._servicio.cargarProductos().subscribe(
      resp => {
        this.productos.set(resp);
        this.cargando.set(false);
      }
    );
  }

}
