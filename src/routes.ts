import {Router} from 'express';
import multer from 'multer';

// Configs
import uploadconfig from './config/upload';

// Controllers
import AvaliacoesController from './controllers/AvaliacoesController';
import TiposServicosController from './controllers/TiposServicosController';
import CidadesController from './controllers/CidadesController';
import PrestadoresController from './controllers/PrestadoresController';

// Consts
const routes = Router();
const upload = multer(uploadconfig);

// Rotas
// Avaliações
routes.get('/avaliacoes', AvaliacoesController.index);
routes.post('/avaliacoes', AvaliacoesController.create);

routes.get('/avaliacoes/:id', AvaliacoesController.show);
routes.put('/avaliacoes/:id', AvaliacoesController.update);
routes.delete('/avaliacoes/:id', AvaliacoesController.delete);

// Tipos Serviços
routes.get('/tipos-servicos', TiposServicosController.index);
routes.post('/tipos-servicos', TiposServicosController.create);

routes.get('/tipos-servicos/:id', TiposServicosController.show);
routes.delete('/tipos-servicos/:id', TiposServicosController.delete);

// Cidades
routes.get('/cidades', CidadesController.index);
routes.post('/cidades', CidadesController.create);

routes.get('/cidades/:id', CidadesController.show);
routes.put('/cidades/:id', CidadesController.update);
routes.delete('/cidades/:id', CidadesController.delete);

// Prestadores
routes.get('/prestadores', PrestadoresController.index);
routes.post(
  '/prestadores',
  upload.array('images'),
  PrestadoresController.create
);

routes.get('/prestadores/:id', PrestadoresController.show);
routes.put('/prestadores/:id', PrestadoresController.update);
routes.delete('/prestadores/:id', PrestadoresController.delete);

routes.get('/', (request, response) => {
  return response.json({message: 'Bem vindo'});
});

export default routes;
