// src/services/clienteServices.js
import db from '../db/db.js'; ''

export const findAll = async (id_produto, nome_produto, minValor, maxValor , tipo) => {
  // 1. Define a consulta SQL base
  let sql = 'SELECT * FROM produto';
  // 2. Cria um array para as condições WHERE
  const conditions = [];
  // 3. Cria um array para os valores (para prevenir SQL Injection)
  const values = [];
  // 4. Adiciona as condições dinamicamente
  // Adicionamos o filtro de CPF
  if (id_produto) {
    conditions.push('id_produto = ?');
    values.push(id_produto);
  }

  if (nome_produto) {
    conditions.push('nome_produto = ?');
    values.push(nome_produto);
  }

  // Adicionamos o filtro de nome
  if (minValor) {
    conditions.push('valor >= ?');
    values.push(valormin);
  }

  if (maxValor) {
    conditions.push('valor <= ?');
    values.push(valormax);
  }
  // Adicionamos o filtro de email
  if (tipo) {
    conditions.push(' tipo = ?');
    values.push(tipo);
  }

  // 5. Se houver condições, anexa elas à consulta SQL
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  // 6. Executa a consulta final
  const [rows] = await db.query(sql, values);
  return rows;

};


export const create = async (produtoData) => {

  await db.query('INSERT INTO produto SET ?', produtoData);
  return produtoData;
};

export const update = async (id_produto, produtoData) => {
  const [result] = await db.query('UPDATE produto SET ? WHERE id_produto = ?', [produtoData, id_produto]);
  return result.affectedRows > 0;
};

export const remove = async (id_produto) => {
  const [result] = await db.query('DELETE FROM produto WHERE id_produto = ?', [id_produto]);
  return result.affectedRows > 0;
};
