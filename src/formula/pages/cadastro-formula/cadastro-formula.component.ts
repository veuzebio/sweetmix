import { CommonModule, Location } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnInit,
  effect,
  computed,
} from '@angular/core';

import { Formula } from '@shared/models';
import { FormulaService } from '@shared/services';
import { AvisoService } from '@shared/services/aviso.service';

import { FormularioCadastroComponent } from '../../components';

@Component({
  imports: [CommonModule, FormularioCadastroComponent],
  templateUrl: 'cadastro-formula.component.html',
  styleUrl: 'cadastro-formula.component.css',
})
export class CadastroFormulaComponent {
  private formulaService = inject(FormulaService);
  private avisoService = inject(AvisoService);
  private location = inject(Location);

  formulaId = input<string>('');
  formulaSelecionada = this.formulaService.formulaSelecionadaResource.value();

  constructor() {
    effect(() => {      
      if (!this.formulaId()) return;

      this.formulaService.idSelecionado.set(this.formulaId());
    });
  }

  voltar(): void {
    this.location.back();
  }

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
