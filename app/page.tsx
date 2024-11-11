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

function cloneGraph(graph: Graph): Graph {
  const newGraph = new Graph();
  const nodeMap = new Map<number, Node>();

  for (const node of graph.nodes) {
    const newNode = new Node(node.value);
    newGraph.nodes.push(newNode);
    nodeMap.set(node.value, newNode);
  }

  for (const node of graph.nodes) {
    const newNode = nodeMap.get(node.value);
    if (newNode) {
      for (const neighborValue of node.neighbors) {
        const neighborNode = nodeMap.get(neighborValue);
        if (neighborNode) {
          newNode.addNeighbor(neighborNode.value);
        }
      }
    }
  }
  return newGraph;
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
  const [graphBFS, setGraphBFS] = useState<Graph | null>(null);
  const [graphDFS, setGraphDFS] = useState<Graph | null>(null);
  const [nodeColorsBFS, setNodeColorsBFS] = useState<Map<number, string>>(new Map());
  const [nodeColorsDFS, setNodeColorsDFS] = useState<Map<number, string>>(new Map());
  const [bfsTime, setBfsTime] = useState<number | null>(null);
  const [dfsTime, setDfsTime] = useState<number | null>(null);

  useEffect(() => {
    const generatedGraph = generateRandomGraph(12, 2);
    setGraphBFS(generatedGraph);
    setGraphDFS(cloneGraph(generatedGraph)); // Criar uma cópia separada para DFS
  }, []);


  async function bfs(graph: Graph | null, start: number, end: number) {
    const startTime = performance.now();
    const queue = [start];
    const visited = new Set<number>();

    while (queue.length) {
      const vertex = queue.shift();

      if (vertex === undefined || visited.has(vertex)) continue;
      visited.add(vertex);

      console.log("bfs:", vertex);

      await updateNodeColor(vertex, "red", "BFS");
      await delay(500);

      if (vertex === end) {
        setBfsTime(performance.now() - startTime);
        return;
      }

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
    setBfsTime(performance.now() - startTime); 
  }

  async function dfs(graph: Graph | null, start: number, end: number) {
    const startTime = performance.now();
    const stack = [start];
    const visited = new Set<number>();


    while (stack.length) {
      const vertex = stack.pop();
      
      if (vertex === undefined || visited.has(vertex)) continue;
      visited.add(vertex);

      console.log("dfs", vertex);

      await updateNodeColor(vertex, "red", "DFS");
      await delay(500);

      if (vertex === end) {
        setDfsTime(performance.now() - startTime);
        return;
      }

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
    setDfsTime(performance.now() - startTime); // Set time even if end is not found
  }

  const renderGraphGrid = (
    graph: Graph,
    nodeColors: Map<number, string>,
    label: string
  ) => {
    const cols = 4;

    return (
      <div>
        <h3>{label}</h3>
        <div
          style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 100px)`, gap: "10px" }}
        >
          {graph.nodes.map((node) => (
            <Image
              key={node.value}
              alt="Carro"
              width={100}
              height={100}
              src={`/${nodeColors.get(node.value) || "yellow"}-car.png`}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleSingleButtonClick = () => {
    const startNode = 0;
    const endNode = 7; // Node final desejado
    if (graphBFS && graphDFS) {
      setNodeColorsBFS(new Map());
      setNodeColorsDFS(new Map());
      setBfsTime(null);
      setDfsTime(null);
      bfs(graphBFS, startNode, endNode);
      dfs(graphDFS, startNode, endNode);
    }
  };

  const updateNodeColor = async (nodeValue: number, color: string, searchType: "BFS" | "DFS") => {
    if (searchType === "BFS") {
      setNodeColorsBFS((prevColors) => {
        const newColors = new Map(prevColors);
        newColors.set(nodeValue, color);
        return newColors;
      });
    } else {
      setNodeColorsDFS((prevColors) => {
        const newColors = new Map(prevColors);
        newColors.set(nodeValue, color);
        return newColors;
      });
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button
          onClick={handleSingleButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Iniciar Busca
        </button>
        {bfsTime !== null && <p>Tempo BFS: {(bfsTime / 1000).toFixed(2)}s</p>}
        {dfsTime !== null && <p>Tempo DFS: {(dfsTime / 1000).toFixed(2)}s</p>}
        {graphBFS && graphDFS ? (
          <div className="flex gap-8">
            {renderGraphGrid(graphBFS, nodeColorsBFS, "BFS")}
            {renderGraphGrid(graphDFS, nodeColorsDFS, "DFS")}
          </div>
        ) : (
          <p>Carregando grafos...</p>
        )}
      </main>
    </div>
  );
}
