import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { Formula } from '@shared/models';
import { FormulaService } from '@shared/services';

import { FormularioCadastroComponent } from '../components';

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
  mensagem = signal('');

  cadastrar(formula: Formula): void {
    this.formulaService.cadastrarNovaFormula(formula).subscribe({
      next: (valor) => {
        console.log('Formula cadastrada com sucesso!', valor);
        this.mensagem.set('Formula cadastrada com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao cadastrar formula!', erro);
        this.mensagem.set('Erro ao cadastrar formula!');
      },
    });
  }
}
