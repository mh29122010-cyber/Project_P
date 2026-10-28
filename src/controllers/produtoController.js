// src/clienteController.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as produtoservice from '../services/produtoservice.js';
import Joi from 'joi';
 
//Usando 'export const' para criar e exportar a função
//Criação dos Schemas que o validate irá usar para validar dados do usuário
export const produtoCreateSchema = Joi.object({
  nome_produto: Joi.string().required().max(100),
  tipo: Joi.string().required().max(100),
  descrição: Joi.string().max(30).allow(''),
  valor: Joi.string().required(),
  imagem: Joi.string().max(50).allow(''),
});
 
export const produtoUpdateSchema = Joi.object({
  nome_produto: Joi.string().max(100),
  tipo: Joi.string().max(100),
  descrição: Joi.string().max(30).allow(''),
  valor: Joi.string().max(30).allow(''),
  imagem: Joi.string().min(6),
}).min(1);
 
export const listarproduto = async (req, res) => {
    try {
    
const { id_produto, nome_produto, minValor, maxValor , tipo } = req.query;
    
const produto = await produtoservice.findAll(id_produto, nome_produto, minValor, maxValor , tipo);
  res.json(produto);
    } catch (err) {
       console.error('Erro ao buscar produtos:', err);
         res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
 
export const adicionarProduto = async (req, res) => {
try {
const novoProduto = await produtoservice.create(req.body);
 res.status(201).json({ message: 'produto adicionado com sucesso', data: novoProduto });
  } catch (err) {
     console.error('Erro ao adicionar produto:', err);
       if (err.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ error: 'Produto já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
};
 
export const atualizarProduto = async (req, res) => {
  try {
    const { id_produto } = req.params;
    const updated = await produtoservice.update(id_produto, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar Produto:', err);
    res.status(500).json({ error: 'Erro ao atualizar Produto' });
  }
};
 
export const deletarProduto = async (req, res) => {
  try {
    const { id_produto } = req.params;
    const deleted = await produtoservice.remove(id_produto);
    if (!deleted) {
      return res.status(404).json({ error: 'produto não encontrado' });
    }
    res.status(200).json({ message: 'produto deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};