import Prestador from '../models/Prestador';

import cidadesView from './cidadesView';
import imagesView from './imagesView';
import tiposServicosView from './tiposServicosView';

export default {
  render(prestador: Prestador) {
    return {
      id: prestador.id,
      nome: prestador.nome,
      email: prestador.email,
      telefone: prestador.telefone,
      resumo: prestador.resumo,
      endereco: {
        latitude: prestador.latitude,
        longitude: prestador.longitude,
        logradouro: prestador.logradouro,
        numero: prestador.numero,
        complemento: prestador.complemento,
        bairro: prestador.bairro,
        cidade: cidadesView.render(prestador.cidade),
      },
      avaliacaoScore: prestador.avaliacao_score,
      ativo: prestador.ativo,
      images: imagesView.renderMany(prestador.images),
      tiposServicos: tiposServicosView.renderMany(prestador.has),
    };
  },

  renderMany(prestadores: Prestador[]) {
    return prestadores.map(prestador => this.render(prestador));
  },
};
