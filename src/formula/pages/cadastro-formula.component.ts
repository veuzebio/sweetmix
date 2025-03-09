import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { Formula } from '@shared/models';
import { FormulaService } from '@shared/services';

import { FormularioCadastroComponent } from '../components';
import { AvisoService } from '@shared/services/aviso.service';

@Component({
  imports: [
    CommonModule,
    FormularioCadastroComponent
],
  templateUrl: 'cadastro-formula.component.html',
  styleUrl: 'cadastro-formula.component.css',
})
export class CadastroFormulaComponent {
  private formulaService = inject(FormulaService);
  private avisoService = inject(AvisoService);
  
  cadastrar(formula: Formula): void {
    this.formulaService.cadastrarNovaFormula(formula).subscribe({
      next: (valor) => {
        console.log('Formula cadastrada com sucesso!', valor);
        this.avisoService.sucesso('Formula cadastrada com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao cadastrar formula!', erro);
        this.avisoService.sucesso('Erro ao cadastrar formula!');
      },
    });
  }
}
