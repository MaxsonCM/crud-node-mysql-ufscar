module.exports = Object.freeze({
    meuHost: process.env.DBHOST || 'localhost',
    meuUsuario: process.env.USER || 'root',
    minhaSenha: process.env.PASS || '',
    minhaBase: process.env.DBNAME || 'meuBd',
    minhaPorta: process.env.DBPORT || '3306'
})
