import Avaliacao from '../models/Avaliacao';

export default {
  render(avaliacao: Avaliacao) {
    return {
      id: avaliacao.id,
      titulo: avaliacao.titulo,
      starRating: avaliacao.star_rating,
      comentario: avaliacao.comentario,
      prestador: {
        id: avaliacao.prestador.id,
        nome: avaliacao.prestador.nome,
      },
    };
  },

  renderMany(avaliacoes: Avaliacao[]) {
    return avaliacoes.map(avaliacao => this.render(avaliacao));
  },
};
