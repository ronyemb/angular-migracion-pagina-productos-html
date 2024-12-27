import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { InfoPagina } from '../../interfaces';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  private _servicio = inject(InfoPaginaService);
  public anio: number = new Date().getFullYear();

  public servicioInfo = signal<InfoPagina>({} as InfoPagina);

  constructor() {
    this._servicio.cargarInfo().subscribe( resp =>
      this.servicioInfo.set(resp)
    )
  }

}
