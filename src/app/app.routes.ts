import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'cadastro-formula',
  //   pathMatch: 'full',
  // },
  {
    path: 'cadastro-formula',
    loadComponent: () =>
      import('../formula/pages/cadastro-formula.component').then(
        (m) => m.CadastroFormulaComponent
      ),
  },
];
