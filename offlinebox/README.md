# OfflineBox

Servidor local Express.js para rodar no Raspberry Pi, com banco de dados embutido (NeDB) e suporte a sincronização via pendrive.

## Como rodar

1. Instale as dependências:
   ```
   cd offlinebox/server
   npm install nedb express
   ```

2. Inicie o servidor:
   ```
   node index.js
   ```

3. (Opcional) Rode o script de sincronização:
   ```
   cd ../sync
   node sync.js
   ```

## Estrutura

- `server/`: Servidor Express.js e banco de dados local
- `sync/`: Scripts de sincronização (mock)

## Segurança

- Para produção, implemente criptografia AES-256 e anonimização dos dados. 