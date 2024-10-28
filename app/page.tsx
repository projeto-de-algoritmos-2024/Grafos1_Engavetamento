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
    this.neighbors.push(node);
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

function generateRandomGraph(numNodes: number, numNeighbors: number): Graph {
  const graph = new Graph();

  for (let i = 0; i < numNodes; i++) {
    graph.addNode(i);
  }

  for (let node of graph.nodes) {
    const neighborsToAdd = new Set<number>();
    const maxNeighbors = Math.min(numNeighbors, numNodes - 1);
    while (neighborsToAdd.size < maxNeighbors) {
      const randomIndex = Math.floor(Math.random() * numNodes);
      if (randomIndex !== node.value) {
        neighborsToAdd.add(randomIndex);
      }
    }

    for (let neighborIndex of neighborsToAdd) {
      const neighborNode = graph.nodes[neighborIndex];
      graph.addEdge(node, neighborNode);
    }
  }

  return graph;
}

export default function Home() {
  const [graph, setGraph] = useState<Graph | null>(null);

  useEffect(() => {
    const generatedGraph = generateRandomGraph(5, 2); // Exemplo com 5 nós e até 3 vizinhos
    setGraph(generatedGraph);
  }, []);

  // Função para formatar a saída do grafo
  const renderGraph = (graph: Graph) => {
    return (
      <ul>
        {graph.nodes.map((node) => (
          <li key={node.value}>
            Node {node.value}: Neighbors [{node.neighbors.map(n => n.value).join(", ")}]
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Aqui temos um teste legal</h1>
        {graph ? renderGraph(graph) : <p>Carregando grafo...</p>}
      </main>
    </div>
  );
}
