//instalar as libs 
//npm install axios
//npm install csv-writer
//sudo apt intall axios

const fs = require('fs');
const axios = require('axios');

const csvFilePath = 'arquivo.csv'; // arquivo csv que vai ser analizado 

async function testUrls() {
  const csv = fs.readFileSync(csvFilePath, 'utf-8');
  const urls = csv.split('\n');

  const forbiddenUrls = [];
  const errorUrls = []; // array para armazenar as URLs com erros

  for (const url of urls) {
    try {
      const response = await axios.get(url);
      if (response.status === 403)         
      {
        forbiddenUrls.push(url);
      }
    } catch (error) {
      console.error(`Erro ao testar URL ${url}: ${error.message}`);
      errorUrls.push(`${url},${error.message}`); // adiciona a URL com erro ao array
    }
  }

  console.log(`URLs que retornaram código 403: ${forbiddenUrls.join(', ')}`);

  const csvContent = `url,erro\n${errorUrls.join('\n')}`;
  // Gera um csv com data e resultado dos games que não  funcionam 

  now = new Date
  fs.writeFile( now.getDay() + ", " + now.getDate() + " de " + now.getMonth() + " de " + now.getFullYear() + 'urls_com_erros.csv', csvContent, (err) => {
    if (err) {
      console.error('Erro ao escrever arquivo CSV', err);
    } else {
      console.log('Arquivo CSV criado com sucesso');
    }
  });
}

testUrls();

