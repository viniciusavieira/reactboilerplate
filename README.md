# README #

ReactBoilerPlate para aplicações ES6 + React + SASS.

Deve ter Node 6.0 ou superior instalado.
Esse projeto não utiliza o reactServer portanto é necessário instalar algum programa para localhost, recomendo Xampp(https://www.apachefriends.org/pt_br/).

Importante lembrar que o Xampp e o skype rodam nas portas 80 e 443, abra o skype caso esteja utilizando e vá em Ferramentas/Opções/Avançado/Conexão e desmarque a opção "Use as portas 80 e 443 como entradas adicionais".

Clone o repositório , abra o terminal na raiz do projeto e rode o comando npm install para baixar e instalar rodas as dependencias do projeto.

Após isso se estiver em Windows digite:
- set NODE_ENV=production;

Se estiver em IOS/Mac:
- NODE_ENV=production;

Após compilado será gerado o projeto na pasta build.

Para compilar o projeto pela primeira vez em abiente de desenvolvimento com as bibliotecas: npm run compile
Para compilar o projeto em abiente de desenvolvimento sem as bibliotecas, compilação rápida somente com códigos da pasta src: npm run dev
Para compilar o projeto para deploy em produção: npm run deploy

Você pode colocar o conteudo do projeto diretamente na pasta de seu localhost ou configurar seu server XAMPP para ler da pasta de sua prefrência:
Mapeie o endereço da pasta do XAMPP para a pasta onde clonou o repositório, abra o arquivo navegando na interface do XAMPP: XAMPP->Apache->Config->Apache->httpd.conf
Substitua as linhas:
DocumentRoot "C:/xampp/localweb"
<Directory "C:/xampp/localweb">

Após isso ao rodar o endereço localhost em seu navegador deverá encontrar a pasta do projeto bastanto clicar nela para acessar.