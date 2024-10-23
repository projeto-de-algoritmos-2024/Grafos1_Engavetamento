# Engavetamento

**Número da Lista**: 13<br>
**Conteúdo da Disciplina**: Grafos1<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 21/1030863  |  Maykon Júnio dos Santos Soares |
| xx/xxxxxx  |  Isaac Lucas de Souza Bezerra |

## Sobre 
A proposta deste projeto é desenvolver um simulador para as buscas em profundidade (DFS) e em largura (BFS), utilizando como exemplo um fenômeno que ocorre frequentemente nas estradas brasileiras: o engavetamento. O engavetamento acontece quando há uma interrupção abrupta no fluxo de veículos em uma estrada de alta velocidade, fazendo com que um carro em movimento colida bruscamente com a traseira de outro. O impacto dessa colisão pode ser tão intenso que a força da batida é transferida para outros veículos à frente ou ao lado, resultando em múltiplos veículos envolvidos no acidente.

Com essa analogia, o objetivo é representar a disseminação da energia do impacto usando os conceitos de DFS e BFS em um grafo. O DFS (Busca em Profundidade) simularia a propagação do impacto de forma mais "profunda", ou seja, a colisão seguiria de um veículo para outro de maneira sequencial e contínua, como se a energia fosse transmitida de forma direta ao longo de um caminho específico. Já o BFS (Busca em Largura) representaria a propagação simultânea do impacto para vários veículos próximos, como se a energia se espalhasse de maneira mais ampla, atingindo vários carros ao mesmo tempo em um nível superficial.

Dessa forma, o simulador visa ilustrar a propagação da energia de uma colisão em um engavetamento, demonstrando como as buscas DFS e BFS se comportam em um cenário realista de trânsito, onde diferentes padrões de disseminação do impacto podem ser observados.

## Screenshots

Imagem 1

Imagem 2

Imagem 3

## Instalação 
**Linguagem**: Python 3.13.0<br>
**Framework**: Django<br>

### Clonando o repositório

```shell
git clone https://github.com/projeto-de-algoritmos-2024/Grafos1_Engavetamento.git
```

### Ambiente virtual

#### Criação

```shell
python -m venv /path/to/new/virtual/environment
```

#### ativando

- linux
```shell
source ./venv/Scripts/activate
```

- windows
```shell
./venv/Scripts/activate
```

### Instalar pacotes

```shell
cd Grafos1_Engavetamento
python -m pip install -r requirements.txt
```

#### Rodando projeto

```shell
cd Grafos1_Engavetamento
python manage.py runserver 8080
```


## Uso 
Explique como usar seu projeto caso haja algum passo a passo após o comando de execução.

## Outros 
Quaisquer outras informações sobre seu projeto podem ser descritas abaixo.




