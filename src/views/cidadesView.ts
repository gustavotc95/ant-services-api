import Cidade from '../models/Cidade';

export default {
  render(cidade: Cidade) {
    return {
      id: cidade.id,
      nome: cidade.nome,
      uf: cidade.uf,
      latitude: cidade.latitude,
      longitude: cidade.longitude,
    };
  },

  renderMany(cidades: Cidade[]) {
    return cidades.map(cidade => this.render(cidade));
  },
};
