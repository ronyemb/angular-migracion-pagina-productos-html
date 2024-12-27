import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  private _servicio = inject(InfoPaginaService);
  public title = signal<string>('');
  private _router = inject(Router);

  constructor() {
    this._servicio.cargarInfo().subscribe( resp => {
      if (resp.titulo !== undefined) {
        this.title.set(resp.titulo);
      }
    });
  }

  public buscarProducto(termino: string) {
    if (termino.length < 1) {
      this._router.navigate(['/search', '']);
    };
    this._router.navigate(['/search', termino]);
  }

}
