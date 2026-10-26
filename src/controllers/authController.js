//srfc/controllers/authcontrollers.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as clienteservice from '../services/clienteservices.js';
export const login = async (req, res) => {
 const {cpf, senha  } = req.body;
 try { 
//1-verificar se o usuario existe no banco de dados
const clientes = await clienteservice.findAll(cpf)
const cliente = clientes[0]

if (!cliente){
    return res.status (401).json({message:"credenciais inválidas"});
}
// 2-Comparar a senha enviada com o hash salvo no banco
const senhaValida = await bcrypt.compare(senha, cliente.senha)
if (!senhaValida) {
    return res.status(401).json ({ message:"credenciais invalidas"});
}
//3-Gerar o token JWT
// o 'payload' são as informações que queremos guardar no token
const payload = { cpf: cliente.cpf, email:cliente.email };
//o token é assinado com nossa chave secreta do .env
 const token = jwt.sign(payload , process.env. JWT_SECRET , {
    expiresIn: '1h'
});
//4-Enviar o token para o cliente 
res.json({message:"Login bem-sucedido!", token : token});
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor."})
 }
}; 
