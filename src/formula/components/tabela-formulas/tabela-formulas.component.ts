import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { Formula } from '@shared/models';

import { FiltrarPorTermoPipe } from '../../pipes';

@Component({
    imports: [CommonModule, FiltrarPorTermoPipe],
    selector: 'for-tabela-formulas',
    templateUrl: 'tabela-formulas.component.html'
})

export class TabelaFormulasComponent implements OnInit {
    formulas = input.required<Formula[]>();
    filtro = input<string>('');
    editarAcionado = output<Formula>();
    excluirAcionado = output<Formula>();

    ngOnInit() { }
}