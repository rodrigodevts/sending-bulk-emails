# Use a imagem Node.js LTS como base
FROM node:lts

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

# Copia os arquivos necessários para instalar as dependências
COPY --chown=node:node package.json yarn.* ./

USER node

RUN yarn install

COPY --chown=node:node . .

# Expondo a porta da aplicação
EXPOSE 3333

# Comando para iniciar o servidor
CMD ["yarn", "start"]
