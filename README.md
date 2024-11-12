# Engavetamento

**Número da Lista**: 13<br>
**Conteúdo da Disciplina**: Grafos1<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 21/1030863  |  Maykon Júnio dos Santos Soares |
| 21/1031735  |  Isaac Lucas Souza Bezerra |

## Sobre 
A proposta deste projeto é desenvolver um simulador para as buscas em profundidade (DFS) e em largura (BFS), utilizando como exemplo um fenômeno que ocorre frequentemente nas estradas brasileiras: o engavetamento. O engavetamento acontece quando há uma interrupção abrupta no fluxo de veículos em uma estrada de alta velocidade, fazendo com que um carro em movimento colida bruscamente com a traseira de outro. O impacto dessa colisão pode ser tão intenso que a força da batida é transferida para outros veículos à frente ou ao lado, resultando em múltiplos veículos envolvidos no acidente.

Com essa analogia, o objetivo é representar a disseminação da energia do impacto usando os conceitos de DFS e BFS em um grafo. O DFS (Busca em Profundidade) simularia a propagação do impacto de forma mais "profunda", ou seja, a colisão seguiria de um veículo para outro de maneira sequencial e contínua, como se a energia fosse transmitida de forma direta ao longo de um caminho específico. Já o BFS (Busca em Largura) representaria a propagação simultânea do impacto para vários veículos próximos, como se a energia se espalhasse de maneira mais ampla, atingindo vários carros ao mesmo tempo em um nível superficial.

Dessa forma, o simulador visa ilustrar a propagação da energia de uma colisão em um engavetamento, demonstrando como as buscas DFS e BFS se comportam em um cenário realista de trânsito, onde diferentes padrões de disseminação do impacto podem ser observados.

## Screenshots

![Captura de tela 2024-11-11 212515](https://github.com/user-attachments/assets/f76103ab-77c5-473a-a5ca-9d17f56b89d1)

![Captura de tela 2024-11-11 212543](https://github.com/user-attachments/assets/a6ea4cb5-19ba-4609-b6ad-b1b7445711fa)

![Captura de tela 2024-11-11 212458](https://github.com/user-attachments/assets/3123a455-7f89-4b2e-a85a-e9cfc5ee8d8f)

<iframe src="https://drive.google.com/file/d/1asTrJiG_rj-rYrA24Qf579kZaHfK-X89/preview" allow="autoplay" allowfullscreen style="width: 100%; height: 520px; border: none; border-radius: 16px; overflow: hidden;"></iframe>


## Instalação 
**Linguagem**: Typescript<br>
**Framework**: Next.js<br>

### Clonando o repositório

```shell
git clone https://github.com/projeto-de-algoritmos-2024/Grafos1_Engavetamento.git
```

## Uso
Após clonar o repositório, instale as dependências necessárias e execute o projeto. Abaixo estão os passos detalhados para rodar o simulador:

### Instale as dependências:

```shell
cd Grafos1_Engavetamento
npm install
```
### Execute o servidor de desenvolvimento:

```shell
npm run dev
```

Abra o navegador e acesse o endereço http://localhost:3000 para visualizar o simulador.

### Passos para usar o simulador:

- Após configurar, o usuário deve iniciar a simulação para observar como o impacto se propaga, seja de forma profunda (DFS) ou superficial (BFS).

## Outros
Este projeto visa unir conceitos de grafos e trânsito, criando uma representação interativa do fenômeno de engavetamento. Foi desenvolvido com foco em promover o aprendizado de grafos de forma prática e visual, auxiliando alunos e entusiastas a entenderem melhor o funcionamento das buscas DFS e BFS através de uma aplicação em um contexto realista.

Caso tenha dúvidas ou sugestões, fique à vontade para abrir uma issue no repositório do GitHub.



