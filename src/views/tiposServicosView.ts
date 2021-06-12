import TipoServico from '../models/TipoServico';

export default {
  render(tipoServico: TipoServico) {
    return {
      id: tipoServico.id,
      nome: tipoServico.nome,
      descricao: tipoServico.descricao,
    };
  },
  renderMany(tiposServicos: TipoServico[]) {
    return tiposServicos.map(tipoServico => this.render(tipoServico));
  },
};
