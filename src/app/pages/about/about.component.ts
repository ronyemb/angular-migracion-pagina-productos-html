import { Component, computed, effect, inject, OnInit } from '@angular/core';
import 'animate.css';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { InfoAbaout } from '../../interfaces';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export default class AboutComponent  {

  public servicio = inject(InfoPaginaService);
  public items: InfoAbaout[] = [];

  constructor() {
    this.servicio.cargarEquipo().subscribe((resp) => {
      this.items = resp;
    });
  }
}
