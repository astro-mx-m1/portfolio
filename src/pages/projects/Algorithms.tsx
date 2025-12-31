import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, TrendingUp, Boxes } from "lucide-react";

const Algorithms = () => {
  const algorithms = [
    {
      category: "Sorting Algorithms",
      icon: TrendingUp,
      projects: [
        { name: "QuickSort Visualizer", complexity: "O(n log n)", status: "Complete" },
        { name: "Merge Sort Animation", complexity: "O(n log n)", status: "Complete" },
        { name: "Bubble Sort Comparison", complexity: "O(n²)", status: "Complete" }
      ]
    },
    {
      category: "Graph Algorithms",
      icon: Network,
      projects: [
        { name: "Dijkstra's Shortest Path", complexity: "O((V+E) log V)", status: "Complete" },
        { name: "BFS/DFS Traversal", complexity: "O(V+E)", status: "Complete" },
        { name: "A* Pathfinding", complexity: "O(b^d)", status: "In Progress" }
      ]
    },
    {
      category: "Data Structures",
      icon: Boxes,
      projects: [
        { name: "Binary Search Tree", complexity: "O(log n)", status: "Complete" },
        { name: "Hash Table Implementation", complexity: "O(1) avg", status: "Complete" },
        { name: "Heap Visualizer", complexity: "O(log n)", status: "In Progress" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Algorithm Visualizers | Mithil Katkoria</title>
        <meta name="description" content="Interactive visualizations of sorting algorithms, graph traversal, and data structures." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Algorithm Visualizers
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Interactive demonstrations of classic algorithms and data structures, making complex concepts tangible through visualization.
            </p>

            <div className="space-y-8">
              {algorithms.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
                    <div className="flex items-center gap-3 mb-6">
                      <Icon className="text-primary" size={32} />
                      <h2 className="text-3xl font-bold">{category.category}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category.projects.map((project, i) => (
                        <div key={i} className="p-4 bg-muted/30 rounded-lg border border-primary/10">
                          <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                          <div className="flex justify-between items-center text-sm">
                            <code className="text-primary">{project.complexity}</code>
                            <Badge variant={project.status === "Complete" ? "default" : "secondary"} className="text-xs">
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Algorithms;