'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

class Node {
  value: number;
  neighbors: number[];

  constructor(value: number) {
    this.value = value;
    this.neighbors = [];
  }

  addNeighbor(node: number) {
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
    if (!this.nodes.find((i) => i.value === value)) {
      const node = new Node(value);
      this.nodes.push(node);
    }
  }

  addEdge(source: Node, destination: Node) {
    source.addNeighbor(destination.value);
  }

  getNode(value: number): Node | null {
    return this.nodes.find((i) => i.value === value) || null;
  }
}

function generateRandomGraph(numNodes: number, numNeighbors: number): Graph {
  const graph = new Graph();

  console.log(graph);

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
  const [nodeColors, setNodeColors] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const generatedGraph = generateRandomGraph(6, 2);
    setGraph(generatedGraph);
  }, []);

  function bfs(graph: Graph | null, start: number) {
    const queue = [start];
    const visited = new Set<number>();
    const result: number[] = [];

    while (queue.length) {
      const vertex = queue.shift();


      if (vertex === undefined || visited.has(vertex)) continue;
      visited.add(vertex);
      result.push(vertex);

      if (graph === null) continue;
      const node = graph.getNode(vertex);

      console.log(visited);

      visited.forEach((i) => {
        updateNodeColor(graph?.getNode(i), 100)
      })

      if (node) {

        for (const neighbor of node.neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }

  const renderGraphGrid = (graph: Graph, nodeColors: Map<number, string>, onNodeClick: (node: Node) => void) => {
    const cols = 3;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 100px)`, gap: '10px' }}>
        {graph.nodes.map((node) => (
          <Image
            key={node.value}
            alt="teste"
            width={100}
            height={100}
            src={`/${nodeColors.get(node.value) || 'yellow'}-car.png`}
            onClick={() => onNodeClick(node)}
          />
        ))}
      </div>
    );
  };

  const handleNodeClick = (node: Node) => {
    console.log(graph);

    bfs(graph, node.value)
  };

  const updateNodeColor = (node: Node | null | undefined, delay: number) => {
    setTimeout(() => {
      setNodeColors((prevColors) => {
        const newColors = new Map(prevColors);
        newColors.set(node?.value || 0, 'red');
        return newColors;
      });
    }, delay);
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {graph ? renderGraphGrid(graph, nodeColors, handleNodeClick) : <p>Carregando grafo...</p>}
      </main>
    </div>
  );
}
