import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Formula, Relatorio, ValidacaoModelo } from '@shared/models';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RelatorioService {
  private API_URI = 'http://localhost:3000/relatorios';
  private http = inject(HttpClient);

  salvarRelatorios(relatorios: Relatorio[]) {
    const codigosUtilizados = relatorios.map((relatorio) => Array.from(relatorio.formulasUtilizadas.keys())).flat();
    return this.http.post<{ codigosUtilizados: string[], relatorios: Relatorio[] }>(this.API_URI, { codigosUtilizados, relatorios });    
  }
}
