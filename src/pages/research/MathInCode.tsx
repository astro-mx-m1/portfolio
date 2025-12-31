import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, GitBranch, Network, TrendingUp, Binary, Sigma } from "lucide-react";

const MathInCode = () => {
  const concepts = [
    {
      icon: TrendingUp,
      title: "Why Logarithms Appear in Algorithms",
      mathConcept: "log₂(n) represents the number of times you can divide n by 2",
      codeApplication: "Binary search, balanced trees, divide-and-conquer",
      example: `// Binary Search: O(log n)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// Each iteration halves the search space
// 1000 elements → 10 comparisons max`,
      insight: "Every time you see 'divide in half', think logarithm. That's why sorted data enables O(log n) search.",
      color: "text-primary"
    },
    {
      icon: GitBranch,
      title: "Recursion as Mathematical Induction",
      mathConcept: "Prove base case, prove n→n+1 implies truth for all n",
      codeApplication: "Recursive algorithms follow the same structure",
      example: `// Factorial: Mathematical definition → Code
// n! = n × (n-1)!  where 0! = 1

function factorial(n) {
  // Base case (0! = 1)
  if (n === 0) return 1;
  
  // Inductive step (n! = n × (n-1)!)
  return n * factorial(n - 1);
}

// The code IS the mathematical definition`,
      insight: "Every recursive function has a base case (induction base) and recursive case (induction step). The structure is identical.",
      color: "text-secondary"
    },
    {
      icon: Network,
      title: "Graph Theory in Real Problems",
      mathConcept: "G = (V, E) where V = vertices, E = edges",
      codeApplication: "Social networks, routing, dependency resolution",
      example: `// Representing friendships as a graph
const socialNetwork = {
  'Alice': ['Bob', 'Charlie'],
  'Bob': ['Alice', 'Diana'],
  'Charlie': ['Alice'],
  'Diana': ['Bob']
};

// BFS to find degrees of separation
function degreesOfSeparation(graph, start, target) {
  const queue = [[start, 0]];
  const visited = new Set([start]);
  
  while (queue.length) {
    const [person, distance] = queue.shift();
    if (person === target) return distance;
    
    for (const friend of graph[person] || []) {
      if (!visited.has(friend)) {
        visited.add(friend);
        queue.push([friend, distance + 1]);
      }
    }
  }
  return -1;
}`,
      insight: "Almost any 'connection' problem is a graph problem. Package dependencies, file systems, web pages—all graphs.",
      color: "text-primary"
    },
    {
      icon: Binary,
      title: "Boolean Algebra in Conditionals",
      mathConcept: "De Morgan's Laws: ¬(A ∧ B) = ¬A ∨ ¬B",
      codeApplication: "Simplifying complex conditions",
      example: `// Before: Complex nested condition
if (!(user.isLoggedIn && user.hasPermission)) {
  showError();
}

// After: Applying De Morgan's Law
// !(A && B) === !A || !B
if (!user.isLoggedIn || !user.hasPermission) {
  showError();
}

// More readable, same logic`,
      insight: "Boolean algebra isn't abstract math—it's the foundation of every if statement you write.",
      color: "text-secondary"
    },
    {
      icon: Sigma,
      title: "Summation Formulas Save Loops",
      mathConcept: "∑(i=1 to n) i = n(n+1)/2",
      codeApplication: "Calculate totals without iteration",
      example: `// Naive: O(n) loop
function sumToN_slow(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Mathematical: O(1) formula
function sumToN_fast(n) {
  return (n * (n + 1)) / 2;
}

// For n = 1,000,000:
// Loop: 1 million operations
// Formula: 3 operations`,
      insight: "Sometimes the best optimization isn't a better algorithm—it's recognizing a mathematical closed form.",
      color: "text-primary"
    },
    {
      icon: Calculator,
      title: "Modular Arithmetic in Real Systems",
      mathConcept: "a ≡ b (mod n) means a and b have same remainder when divided by n",
      codeApplication: "Hash tables, circular buffers, cryptography",
      example: `// Hash table index calculation
function hashIndex(key, tableSize) {
  const hash = hashFunction(key);
  return hash % tableSize; // Modular arithmetic!
}

// Circular buffer (like a clock)
class CircularBuffer {
  constructor(size) {
    this.buffer = new Array(size);
    this.head = 0;
  }
  
  push(item) {
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.buffer.length;
    // ^ Wraps around using modulo
  }
}`,
      insight: "Modulo is everywhere: array indexing, time calculations, cryptographic operations. It's the 'wrap around' operator.",
      color: "text-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Mathematical Thinking in Code | Mithil Katkoria</title>
        <meta name="description" content="Exploring the deep connections between mathematics and computer science through practical code examples." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                🗣 Ask me about this in interview
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                Mathematical Thinking in Code
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Mathematics isn't separate from programming—it's the foundation. Here's how
                mathematical concepts directly translate to better code.
              </p>
            </div>

            <Card className="mb-12 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
              <CardContent className="p-8">
                <blockquote className="text-2xl font-medium italic text-center text-foreground/90">
                  "I enjoy translating mathematical ideas into code."
                </blockquote>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {concepts.map((concept, index) => {
                const Icon = concept.icon;
                return (
                  <Card 
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${concept.color === 'text-primary' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                          <Icon className={concept.color} size={28} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{concept.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              Math: {concept.mathConcept}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold mb-2 text-muted-foreground">Code Application: {concept.codeApplication}</h4>
                        <pre className="text-sm overflow-x-auto font-mono text-foreground/90 whitespace-pre-wrap">
                          {concept.example}
                        </pre>
                      </div>

                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                        <h4 className="font-semibold text-primary mb-2">💡 Key Insight</h4>
                        <p className="text-muted-foreground">{concept.insight}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 glow-text">Why This Matters</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Understanding the mathematical foundations doesn't just make you better at algorithms—
                  it changes how you see problems. You start recognizing patterns, applying theorems, 
                  and finding elegant solutions that others miss.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MathInCode;
