import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'cadastro-formula',
  //   pathMatch: 'full',
  // },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('../formula/pages/cadastro-formula/cadastro-formula.component').then(
        (m) => m.CadastroFormulaComponent
      ),
  },
  {
    path: 'cadastro/:formulaId',
    loadComponent: () =>
      import('../formula/pages/cadastro-formula/cadastro-formula.component').then(
        (m) => m.CadastroFormulaComponent
      ),
  },
  {
    path: 'listagem',
    loadComponent: () =>
      import('../formula/pages/listagem/listagem.component').then(
        (m) => m.ListagemComponent
      ),
  },
];
