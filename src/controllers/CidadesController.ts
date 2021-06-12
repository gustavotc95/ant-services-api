import {Request, Response} from 'express';
import {getRepository, Like} from 'typeorm';
import * as Yup from 'yup';

import Cidade from '../models/Cidade';
import cidadeView from '../views/cidadesView';

export default {
  async index(request: Request, response: Response) {
    const cidadesRepository = getRepository(Cidade);

    const {uf} = request.query;

    let cidades: Cidade[];

    if (uf) {
      cidades = await cidadesRepository.find({
        uf: Like(`%${uf}%`),
      });
    } else {
      cidades = await cidadesRepository.find();
    }

    return response.status(201).json(cidadeView.renderMany(cidades));
  },

  async show(request: Request, response: Response) {
    const {id} = request.params;

    const cidadesRepository = getRepository(Cidade);

    const cidade = await cidadesRepository.findOneOrFail(id);

    return response.status(201).json(cidadeView.render(cidade));
  },

  async create(request: Request, response: Response) {
    const cidadesRepository = getRepository(Cidade);

    const data = {
      nome: request.body.nome,
      uf: request.body.uf,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      uf: Yup.string().required().min(2).max(2),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const cidade = cidadesRepository.create(data);

    await cidadesRepository.save(cidade);

    return response.status(201).json(cidadeView.render(cidade));
  },

  async update(request: Request, response: Response) {
    const {id} = request.params;

    const cidadesRepository = getRepository(Cidade);

    const data = {
      nome: request.body.nome,
      uf: request.body.uf,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      uf: Yup.string().required().min(2).max(2),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    await cidadesRepository.update(id, data);

    const cidade = await cidadesRepository.findOneOrFail(id);

    return response.status(201).json(cidadeView.render(cidade));
  },

  async delete(request: Request, response: Response) {
    const {id} = request.params;

    const cidadesRepository = getRepository(Cidade);

    const cidade = await cidadesRepository.findOneOrFail(id);

    await cidadesRepository.remove(cidade);

    return response.status(200).json({message: 'Cidade deletada com sucesso!'});
  },
};
