import { Formula } from '@shared/models';
import { TipoFormulario } from './tipo-formulario';

export interface FormulaSalva {
  formula: Formula;
  tipo: TipoFormulario;
}
