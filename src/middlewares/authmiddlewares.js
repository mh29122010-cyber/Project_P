import jwt from 'jsonwebtoken';
const authmiddleware = (req, res, next) => {
const authHeader = req.headers.authorization; 
if (!authHeader){
 return res.status(401).json({message: "token de autenticação não fornecido."});
}

const parts = authHeader.spli(' ');
if (parts.length !== 2){
    return res.status(401).json({message: "token em formato invalido"});
 }
const[scheme, token] = parts;
 if (!/^Bearer$/i.teste(scheme)) {
    return res.status(401).json({message: "token mal formatado"});
}

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err){
        return res.status(401).json({message: "token invalido ou ezxpirado."});
}
req.userCpf = decoded.cpf;
req.userEmail = decoded.email;
return next()
});
};
export default authmiddleware