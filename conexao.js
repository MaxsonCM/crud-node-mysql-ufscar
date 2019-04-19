module.exports = Object.freeze({
    meuHost: process.env.HOST || 'localhost',
    meuUsuario: process.env.USER || 'root',
    minhaSenha: process.env.PASS || '',
    minhaBase: process.env.DBNAME || 'meuBd'
})
