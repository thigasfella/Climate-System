# Climate System

Este é um aplicativo de previsão do tempo desenvolvido em React utilizando Next.js. Ele permite que os usuários selecionem uma cidade e visualizem a previsão do tempo atual, incluindo temperatura, umidade, chance de chuva e velocidade do vento.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface.
- **Next.js**: Framework React para renderização no servidor e otimização de performance.
- **TypeScript**: Tipagem estática para JavaScript.
- **React Toastify**: Biblioteca para exibição de notificações.
- **CSS Modules**: Estilos encapsulados com CSS Modules.
- **APIs**: 
  - Previsão do tempo via API com base na cidade selecionada.
  - IBGE para listar as cidades brasileiras.

## Como Usar

1. Clone este repositório em sua máquina local:
   ```bash
   git clone https://github.com/thigasfella/Climate-System.git

2. Navegue até o diretório do projeto:
    - cd nome-do-repositorio

3. Instale as dependências do projeto:
    - npm install

4. Crie um arquivo .env.local na raiz do projeto e adicione suas variáveis de ambiente: 
    - NEXT_PUBLIC_BASE_URL=URL_DA_API
    - NEXT_PUBLIC_API_KEY=SUA_CHAVE_API
    - Inicie o servidor de desenvolvimento:


5. npm run dev
    - Acesse o aplicativo no seu navegador em http://localhost:3000.

 - Funcionalidades
 - Seleção de cidades através de um dropdown.
 - Exibição de dados como:
 - Temperatura atual
 - Temperatura mínima e máxima
 - Umidade
 - Velocidade do vento
 - Chance de chuva
 - Feedback visual utilizando barras de progresso para representar os dados.