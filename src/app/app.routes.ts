import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listagem',
    pathMatch: 'full',
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('../formula/pages/cadastro/cadastro.component').then(
        (m) => m.CadastroComponent
      ),
  },
  {
    path: 'cadastro/:formulaId',
    loadComponent: () =>
      import('../formula/pages/cadastro/cadastro.component').then(
        (m) => m.CadastroComponent
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
