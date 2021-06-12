import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';

import Avaliacao from '../models/Avaliacao';
import Prestador from '../models/Prestador';
import avaliacaoView from '../views/avaliacoesView';

export default {
  async index(request: Request, response: Response) {
    const avaliacoesRepository = getRepository(Avaliacao);

    const {prestador} = request.query;

    let avaliacao: Avaliacao[];

    if (prestador) {
      avaliacao = await avaliacoesRepository.find({
        relations: ['prestador'],
        where: {prestador: {id: prestador}},
      });
    } else {
      avaliacao = await avaliacoesRepository.find({
        relations: ['prestador'],
      });
    }

    return response.status(201).json(avaliacaoView.renderMany(avaliacao));
  },

  async show(request: Request, response: Response) {
    const {id} = request.params;

    const avaliacoesRepository = getRepository(Avaliacao);

    const avaliacao = await avaliacoesRepository.findOneOrFail(id, {
      relations: ['prestador'],
    });

    return response.status(201).json(avaliacaoView.render(avaliacao));
  },

  async create(request: Request, response: Response) {
    const avaliacoesRepository = getRepository(Avaliacao);
    const prestadoresRepository = getRepository(Prestador);

    const prestador = await prestadoresRepository.findOne({
      id: request.body.prestador,
    });

    const data = {
      titulo: request.body.titulo,
      star_rating: request.body.starRating,
      comentario: request.body.comentario,
      prestador: prestador,
    };

    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      star_rating: Yup.string().required(),
      comentario: Yup.string().required(),
      prestador: Yup.object(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const avaliacao = avaliacoesRepository.create(data);

    await avaliacoesRepository.save(avaliacao);

    return response.status(201).json(avaliacaoView.render(avaliacao));
  },

  async update(request: Request, response: Response) {
    const {id} = request.params;

    const avaliacoesRepository = getRepository(Avaliacao);

    const data = {
      titulo: request.body.titulo,
      star_rating: request.body.starRating,
      comentario: request.body.comentario,
      prestador: request.body.prestador,
    };

    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      star_rating: Yup.string().required(),
      comentario: Yup.string().required(),
      prestador: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    await avaliacoesRepository.update(id, data);

    const avaliacao = await avaliacoesRepository.findOneOrFail(id);

    return response.status(201).json(avaliacaoView.render(avaliacao));
  },

  async delete(request: Request, response: Response) {
    const {id} = request.params;

    const avaliacoesRepository = getRepository(Avaliacao);

    const avaliacao = await avaliacoesRepository.findOneOrFail(id, {
      relations: ['prestador'],
    });

    await avaliacoesRepository.remove(avaliacao);

    return response
      .status(200)
      .json({message: 'Avaliação deletada com sucesso!'});
  },
};
