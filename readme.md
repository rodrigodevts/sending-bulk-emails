Enviar e-mail pra uma lista de uma forma fácil
-----

RF (Requisitos Funcionais)
- Importar uma lista em CSV e relacionar ela com uma tag
- Enviar e-mail para uma ou mais tags
- Listar inscritos em uma ou mais tags
- Visualização do progresso de envio (concluído/não concluído)

RNF(Requisitos não funcionais)
- Utilizar Amazon SES 
- Utilizar MongoDB
- Utilizar Express
- Utilizar serviço de mensageria (Redis, ou Krafta)

RN (Regras de Negócio)
- Na importação, se a tag não existir ela deve ser criada
- Na importação, se o usuário já existir, só vamos veicula-lo com a tag
- A importação deve permitir múltiplas tags


# Envio de Mensagem

[x]Cadastrar uma mensagem no MongoDB;
[x]Cadastrar um registro por destinatário dentro do Redis (File);
[x]Processar a fila de e-mails enviando um e-mail para cada destinatário;
[x]Recuperar um item de dentro da fila do Redis;
[x]Processar o item enviando o e-mail;

# Docker Containers Errors
- Para problemas de permissões na pasta tmp/redis, ou tmp/mongo, rodar o comando
`sudo chown -R 1001:1001 /tmp/redis`
- Para o problema de permissão do appendonlydir, rodar o comando:
`sudo sysctl vm.overcommit_memory=1`
