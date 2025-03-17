import { CommonModule, Location } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { Formula } from '@shared/models';
import { FormulaService } from '@shared/services';
import { AvisoService } from '@shared/services/aviso.service';

import { Observable } from 'rxjs';
import { FormularioCadastroComponent } from '../../components';
import { FormulaSalva } from '../../models';

@Component({
  imports: [CommonModule, FormularioCadastroComponent],
  templateUrl: 'cadastro.component.html',
})
export class CadastroComponent implements OnInit {
  private formulaService = inject(FormulaService);
  private avisoService = inject(AvisoService);
  private location = inject(Location);

  formulaId = input<string>('');
  formulaSelecionada$!: Observable<Formula | null>;

  ngOnInit(): void {
    if (!this.formulaId()) return;

    this.formulaSelecionada$ = this.formulaService.obterFormulaPorId(this.formulaId());
  }

  voltar(): void {
    this.location.back();
  }

  salvar(evento: FormulaSalva): void {
    const { formula, tipo } = evento;

    if (tipo === 'cadastro') {
      this.formulaService.cadastrarNovaFormula(formula).subscribe({
        next: () =>
          this.avisoService.sucesso('Formula cadastrada com sucesso!'),
        error: () =>
          this.avisoService.sucesso('Erro ao cadastrar formula!'),
      });
    } else if (tipo === 'edicao') {
      this.formulaService.atualizarFormula(formula).subscribe({
        next: () =>
          this.avisoService.sucesso('Formula editada com sucesso!'),
        error: () => this.avisoService.sucesso('Erro ao editar formula!'),
      });
    }
  }
}
