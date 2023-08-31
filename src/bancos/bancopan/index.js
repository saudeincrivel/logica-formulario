let request = require("request-promise");
const cookieJar = request.jar();
request = request.defaults({ jar: cookieJar });

async function run() {
  const result = request.get("https://veiculos.bancopan.com.br/");
  console.log(cookieJar.getCookieString("https://veiculos.bancopan.com.br/"));
}

run();
