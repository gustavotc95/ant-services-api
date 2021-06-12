import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';

import TipoServico from '../models/TipoServico';
import tipoServicoView from '../views/tiposServicosView';

export default {
  async index(request: Request, response: Response) {
    const tiposServicosRepository = getRepository(TipoServico);

    const tiposServicos = await tiposServicosRepository.find();

    return response.status(200).json(tipoServicoView.renderMany(tiposServicos));
  },

  async create(request: Request, response: Response) {
    const tiposServicosRepository = getRepository(TipoServico);

    const data = {
      nome: request.body.nome,
      descricao: request.body.descricao,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      descricao: Yup.string().required().max(100),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const tipoServico = tiposServicosRepository.create(data);

    await tiposServicosRepository.save(tipoServico);

    return response.status(201).json(tipoServicoView.render(tipoServico));
  },

  async show(request: Request, response: Response) {
    const {id} = request.params;

    const tiposServicosRepository = getRepository(TipoServico);

    const tipoServico = await tiposServicosRepository.findOneOrFail(id);

    return response.json(tipoServicoView.render(tipoServico));
  },

  async delete(request: Request, response: Response) {
    const {id} = request.params;

    const tiposServicosRepository = getRepository(TipoServico);

    const tipoServico = await tiposServicosRepository.findOneOrFail(id);

    await tiposServicosRepository.remove(tipoServico);

    return response
      .status(200)
      .json({message: 'Tipo de serviço deletado com sucesso!'});
  },
};
