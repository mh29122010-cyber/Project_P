import db from '../db/db.js';
 
export const findAll = async (minValor, maxValor , nome_produto, id_produto , tipo  ) => {
  // 1. Define a consulta SQL base
  let sql = 'SELECT * FROM ';
  // 2. Cria um array para as condições WHERE
  const conditions = [];
  // 3. Cria um array para os valores (para prevenir SQL Injection)
  const values = [];
  // 4. Adiciona as condições dinamicamente
  // Adicionamos o filtro de valor minimo
  if (minValor) {
    conditions.push('valor >= ?');
    values.push(minValor);
  }
  // Adicionamos o filtro de valor maximo
  if (maxValor) {
    conditions.push('valor <= ?');
    values.push(maxValor);
  }
  // Adicionamos o filtro de nome
  if (nome_produto) {
    conditions.push('LOWER(nome) LIKE ?');
    values.push(`%${nome_produto.toLowerCase()}%`);
  }
  // Adicionamos o filtro de id
  if (id_produto) {
    conditions.push('id_produto = ?');
    values.push(id_produto);
  }
 // Adicionamos o filtro de tipo
 if (tipo) {
    conditions.push('LOWER(tipo) LIKE ?');
    values.push(`%${tipo.toLowerCase()}%`);
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

await db.query('INSERT INTO produto SET ?', produtoData)
delete newCliente.senha;
return newCliente;
};

export const update = async (id_produto, produtoDataData) => {
const [result] = await db.query('UPDATE usuario SET ? WHERE id_produto = ?', [produtoDataData, id_produto]);
  return result.affectedRows > 0;
};

export const remove = async (id_produto) => {
  const [result] = await db.query('DELETE FROM usuario WHERE id_produto = ?', [id_produto]);
  return result.affectedRows > 0;
};