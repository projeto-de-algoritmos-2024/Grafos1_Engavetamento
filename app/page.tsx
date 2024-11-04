'use client'

import { useEffect, useState } from "react";

class Node {
  value: number;
  neighbors: Node[];

  constructor(value: number) {
    this.value = value;
    this.neighbors = [];
  }

  addNeighbor(node: Node) {
    if (!this.neighbors.includes(node)) {
      this.neighbors.push(node);
    }
  }
}

class Graph {
  nodes: Node[];

  constructor() {
    this.nodes = [];
  }

  addNode(value: number) {
    const node = new Node(value);
    this.nodes.push(node);
  }

  addEdge(source: Node, destination: Node) {
    source.addNeighbor(destination);
    destination.addNeighbor(source);
  }
}

// Função para gerar um grafo em grid
function generateStructuredGraph(rows: number, cols: number): Graph {
  const graph = new Graph();

  // Adiciona nós na matriz
  for (let i = 0; i < rows * cols; i++) {
    graph.addNode(i);
  }

  // Conecta os nós horizontalmente e verticalmente
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      // Conecta horizontalmente
      if (c < cols - 1) {
        graph.addEdge(graph.nodes[index], graph.nodes[index + 1]);
      }
      // Conecta verticalmente
      if (r < rows - 1) {
        graph.addEdge(graph.nodes[index], graph.nodes[index + cols]);
      }
    }
  }

  return graph;
}

// Função para renderizar o grafo como grid
const renderGraphGrid = (graph: Graph, onNodeClick: (node: Node) => void) => {
  const cols = 4; // Número fixo de colunas (pode ser alterado conforme a necessidade)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 100px)`, gap: '10px' }}>
      {graph.nodes.map((node) => (
        <div 
          key={node.value} 
          style={{
            borderRadius: '100px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'green',
            cursor: 'pointer' // Adiciona um cursor de pointer para indicar que é clicável
          }}
          onClick={() => onNodeClick(node)} // Adiciona evento de clique
        >
          {node.value}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const generatedGraph = generateStructuredGraph(3, 4); // 3 linhas, 4 colunas
    setGraph(generatedGraph);
  }, []);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Aqui temos um teste legal</h1>
        {graph ? renderGraphGrid(graph, handleNodeClick) : <p>Carregando grafo...</p>}
        
        {/* Exibe os vizinhos do nó selecionado */}
        {selectedNode && (
          <div>
            <h2>Vizinhos do Node {selectedNode.value}:</h2>
            <ul>
              {selectedNode.neighbors.map(neighbor => (
                <li key={neighbor.value}>{neighbor.value}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
