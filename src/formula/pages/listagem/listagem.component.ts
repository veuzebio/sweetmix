import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Formula } from '@shared/models';
import { FormulaService } from '@shared/services';

import { Router } from '@angular/router';
import { SweetmixInputComponent } from '@shared/components';
import { TabelaFormulasComponent } from '../../components';

@Component({
  imports: [
    FormsModule,
    CommonModule,
    SweetmixInputComponent,
    TabelaFormulasComponent,
  ],
  templateUrl: 'listagem.component.html',
})
export class ListagemComponent {
  private formulaService = inject(FormulaService);
  private router = inject(Router);

  filtro = this.formulaService.filtro;
  formulas = this.formulaService.formulasResource;

  editar(formula: Formula): void {
    this.router.navigate(['cadastro', formula.id]);
  }

  excluir(formula: Formula): void {
    if (!confirm(`Deseja realmente excluir a formula ${formula.codigo}?`))
      return;

    this.formulas.update((formulas) =>
      formulas.filter((f) => f.id !== formula.id)
    );
    
    this.formulaService.excluirFormula(formula).subscribe();
  }
}
