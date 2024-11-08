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
  console.log("Grafo: ", graph); 
  return graph;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [nodeColors, setNodeColors] = useState<Map<number, string>>(new Map());
  const [searchType, setSearchType] = useState<"BFS" | "DFS">("BFS"); 

  useEffect(() => {
    const generatedGraph = generateRandomGraph(6, 2);
    setGraph(generatedGraph);
  }, []);


  async function bfs(graph: Graph | null, start: number) {
    const queue = [start];
    const visited = new Set<number>();
    
    while (queue.length) {
      const vertex = queue.shift();

      if (vertex === undefined || visited.has(vertex)) continue;
      visited.add(vertex);

      console.log("bfs:", vertex); 

      await updateNodeColor(vertex, "red");
      await delay(500);

      if (graph === null) continue;
      const node = graph.getNode(vertex);

      if (node) {
        for (const neighbor of node.neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }

  async function dfs(graph: Graph | null, start: number) {
    const stack = [start];
    const visited = new Set<number>();

    
    while (stack.length) {
      const vertex = stack.pop();

      if (vertex === undefined || visited.has(vertex)) continue;
      visited.add(vertex);

      console.log("dsf", vertex); 

      await updateNodeColor(vertex, "red");
      await delay(500);

      if (graph === null) continue;
      const node = graph.getNode(vertex);

      if (node) {
        for (const neighbor of node.neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }
  }

  const renderGraphGrid = (graph: Graph, nodeColors: Map<number, string>, onNodeClick: (node: Node) => void) => {
    const cols = 3;

    return (
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 100px)`, gap: "10px" }}>
        {graph.nodes.map((node) => (
          <Image
            key={node.value}
            alt="Carro"
            width={100}
            height={100}
            src={`/${nodeColors.get(node.value) || "yellow"}-car.png`}
            onClick={() => onNodeClick(node)}
          />
        ))}
      </div>
    );
  };

  const handleNodeClick = (node: Node) => {
    if (graph) {
      setNodeColors(new Map());
      
      if (searchType === "BFS") {
        bfs(graph, node.value);
      } else if (searchType === "DFS") {
        dfs(graph, node.value);
      }
    }
  };

  const updateNodeColor = async (nodeValue: number, color: string) => {
    setNodeColors((prevColors) => {
      const newColors = new Map(prevColors);
      newColors.set(nodeValue, color);
      return newColors;
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 mb-4">
          <button onClick={() => setSearchType("BFS")} className="px-4 py-2 bg-blue-500 text-white rounded">
            BFS
          </button>
          <button onClick={() => setSearchType("DFS")} className="px-4 py-2 bg-green-500 text-white rounded">
            DFS
          </button>
        </div>
        {graph ? renderGraphGrid(graph, nodeColors, handleNodeClick) : <p>Carregando grafo...</p>}
      </main>
    </div>
  );
}
