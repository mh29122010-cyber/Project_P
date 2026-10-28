// src/routes/clienteRoutes.env
import express from 'express';
import * as produtocontroller from '../controllers/produtoController.js';
import validate from '../middlewares/validate.js';
import { produtoCreateSchema,produtoUpdateSchema } from '../controllers/produtoController.js';
 
// // 1. Importa o middleware de login. Descomentar para carregar
import authmiddleware from '../middlewares/authmiddlewares.js';
 
const router = express.Router();
 
// A rota de criação de cliente (registro) continua pública
router.post('/', validate(produtoCreateSchema), produtocontroller.adicionarProduto);// Rota final: POST /api/clientes
 
//  2. Aplica o proteção do login em todas as rotas abaixo desta linha
//router.use(authmiddleware);
 
// O caminho base '/api/clientes' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', etc.
router.get('/', produtocontroller.listarproduto); // Rota final: GET /api/clientes
 
router.put('/:id_produto', validate(produtoUpdateSchema), produtocontroller.atualizarProduto); // Rota final: PUT /api/clientes/:cpf
 
router.delete('/:id_produto', produtocontroller.deletarProduto); // Rota final: DELETE /api/clientes/:cpf
export default router;
