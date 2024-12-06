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
