import {Request, Response} from 'express';
import {getRepository, In} from 'typeorm';
import * as Yup from 'yup';

import TipoServico from '../models/TipoServico';
import Prestador from '../models/Prestador';
import Cidade from '../models/Cidade';

import prestadorView from '../views/prestadoresView';

export default {
  async index(request: Request, response: Response) {
    const prestadoresRepository = getRepository(Prestador);

    const {cidade, tipoServico} = request.query;

    // TODO: Refatorar quando possível
    let prestadores: Prestador[];

    if (cidade && tipoServico) {
      if (!(Number(cidade) > 0 && Number(tipoServico) > 0)) {
        return response.json({
          message: 'Para a pesquisa por Tipo de Serviço a cidade é obrigatória',
        });
      }
      const result = await prestadoresRepository.query(`
        SELECT prestadores.id 
        FROM prestadores left OUTER join tipos_servicos left join prestadores_has_tipos_servicos join cidades
        on prestadores_has_tipos_servicos.tiposServicosId = tipos_servicos.id
        and prestadores.id = prestadores_has_tipos_servicos.prestadoresId
        and prestadores.cidade_id = cidades.id
        where tipos_servicos.id=${tipoServico} and prestadores.cidade_id=${cidade}`);

      if (result[0]?.id) {
        prestadores = await prestadoresRepository.find({
          relations: ['images', 'has', 'cidade'],
          where: [...result],
        });
      } else {
        prestadores = [];
        return response.json(prestadores);
      }
    } else if (Number(cidade) > 0) {
      prestadores = await prestadoresRepository.find({
        relations: ['images', 'has', 'cidade'],
        where: {
          cidade: {id: cidade},
        },
      });
    } else {
      prestadores = await prestadoresRepository.find({
        relations: ['images', 'has', 'cidade'],
      });
    }

    return response.json(prestadorView.renderMany(prestadores));
  },

  async show(request: Request, response: Response) {
    const {id} = request.params;

    const prestadoresRepository = getRepository(Prestador);

    const prestador = await prestadoresRepository.findOneOrFail(id, {
      relations: ['images', 'has', 'cidade'],
    });

    return response.json(prestadorView.render(prestador));
  },

  async create(request: Request, response: Response) {
    const prestadoresRepository = getRepository(Prestador);
    const tiposServicosRepository = getRepository(TipoServico);
    const cidadesRepository = getRepository(Cidade);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return {path: image.filename};
    });

    const tiposServicos: number[] = [];

    tiposServicos.push(...request.body.tiposServicos);

    const cidade = await cidadesRepository.findOne({
      id: request.body.cidade,
    });

    const data = {
      nome: request.body.nome,
      email: request.body.email,
      telefone: request.body.telefone,
      resumo: request.body.resumo,
      logradouro: request.body.logradouro,
      numero: request.body.numero,
      complemento: request.body.complemento,
      bairro: request.body.bairro,
      cep: request.body.cep,
      cidade: cidade,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      avaliacao_score: request.body.avaliacaoScore,
      ativo: true,
      tipos_servicos: [...request.body.tiposServicos],
      images: images,
    };

    const tipoServico = await tiposServicosRepository.find({
      id: In(data.tipos_servicos),
    });

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().required(),
      telefone: Yup.string().required(),
      resumo: Yup.string().required().max(500),
      logradouro: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string(),
      bairro: Yup.string(),
      cep: Yup.string(),
      cidade: Yup.object(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      avaliacao_score: Yup.number().required(),
      ativo: Yup.boolean(),
      tipos_servicos: Yup.array(Yup.string()).required().min(1),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      )
        .required()
        .min(1),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const prestador = prestadoresRepository.create(data);

    prestador.has = [...tipoServico];

    await prestadoresRepository.save(prestador);

    return response.status(201).json(prestadorView.render(prestador));
  },

  async update(request: Request, response: Response) {
    const {id} = request.params;

    return response.status(200).json({message: 'Em breve!'});
  },

  async delete(request: Request, response: Response) {
    const {id} = request.params;

    const prestadoresRepository = getRepository(Prestador);

    const prestador = await prestadoresRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    await prestadoresRepository.remove(prestador);

    return response
      .status(200)
      .json({message: 'Prestador deletado com sucesso!'});
  },
};
