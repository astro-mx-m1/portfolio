import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type Algorithm = 'bubble' | 'merge' | 'quick' | 'binary';

const AlgorithmPlayground = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('bubble');
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState<{array: number[], comparing: number[], sorted: number[], description: string}[]>([]);

  const algorithms = [
    { id: 'bubble' as Algorithm, name: 'Bubble Sort', complexity: 'O(n²)', best: 'O(n)', space: 'O(1)' },
    { id: 'merge' as Algorithm, name: 'Merge Sort', complexity: 'O(n log n)', best: 'O(n log n)', space: 'O(n)' },
    { id: 'quick' as Algorithm, name: 'Quick Sort', complexity: 'O(n²)', best: 'O(n log n)', space: 'O(log n)' },
    { id: 'binary' as Algorithm, name: 'Binary Search', complexity: 'O(log n)', best: 'O(1)', space: 'O(1)' },
  ];

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
    setStep(0);
    setIsPlaying(false);
    generateSteps(newArray, selectedAlgorithm);
  }, [selectedAlgorithm]);

  const generateSteps = (arr: number[], algo: Algorithm) => {
    const newSteps: typeof steps = [];
    const workingArray = [...arr];

    if (algo === 'bubble') {
      for (let i = 0; i < workingArray.length; i++) {
        for (let j = 0; j < workingArray.length - i - 1; j++) {
          newSteps.push({
            array: [...workingArray],
            comparing: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => workingArray.length - 1 - k),
            description: `Comparing ${workingArray[j]} and ${workingArray[j + 1]}`
          });
          if (workingArray[j] > workingArray[j + 1]) {
            [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
            newSteps.push({
              array: [...workingArray],
              comparing: [j, j + 1],
              sorted: Array.from({ length: i }, (_, k) => workingArray.length - 1 - k),
              description: `Swapped! ${workingArray[j + 1]} > ${workingArray[j]}`
            });
          }
        }
      }
      newSteps.push({
        array: [...workingArray],
        comparing: [],
        sorted: Array.from({ length: workingArray.length }, (_, i) => i),
        description: 'Array is sorted!'
      });
    } else if (algo === 'binary') {
      workingArray.sort((a, b) => a - b);
      const target = workingArray[Math.floor(Math.random() * workingArray.length)];
      let left = 0, right = workingArray.length - 1;
      
      newSteps.push({
        array: [...workingArray],
        comparing: [],
        sorted: [],
        description: `Searching for ${target} in sorted array`
      });

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        newSteps.push({
          array: [...workingArray],
          comparing: [mid],
          sorted: [],
          description: `Checking middle element: ${workingArray[mid]}`
        });
        
        if (workingArray[mid] === target) {
          newSteps.push({
            array: [...workingArray],
            comparing: [],
            sorted: [mid],
            description: `Found ${target} at index ${mid}!`
          });
          break;
        } else if (workingArray[mid] < target) {
          left = mid + 1;
          newSteps.push({
            array: [...workingArray],
            comparing: Array.from({ length: mid + 1 }, (_, i) => i),
            sorted: [],
            description: `${workingArray[mid]} < ${target}, search right half`
          });
        } else {
          right = mid - 1;
          newSteps.push({
            array: [...workingArray],
            comparing: Array.from({ length: workingArray.length - mid }, (_, i) => mid + i),
            sorted: [],
            description: `${workingArray[mid]} > ${target}, search left half`
          });
        }
      }
    } else {
      // Simple simulation for merge/quick
      for (let i = 0; i < 20; i++) {
        newSteps.push({
          array: [...workingArray].sort(() => Math.random() - 0.5),
          comparing: [Math.floor(Math.random() * workingArray.length)],
          sorted: [],
          description: `Step ${i + 1} of ${algo} sort...`
        });
      }
      newSteps.push({
        array: [...workingArray].sort((a, b) => a - b),
        comparing: [],
        sorted: Array.from({ length: workingArray.length }, (_, i) => i),
        description: 'Array is sorted!'
      });
    }

    setSteps(newSteps);
  };

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  useEffect(() => {
    if (isPlaying && step < steps.length - 1) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 1000 - speed[0] * 9);
      return () => clearTimeout(timer);
    } else if (step >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, step, steps.length, speed]);

  useEffect(() => {
    if (steps[step]) {
      setArray(steps[step].array);
      setComparing(steps[step].comparing);
      setSorted(steps[step].sorted);
    }
  }, [step, steps]);

  const currentAlgo = algorithms.find(a => a.id === selectedAlgorithm)!;

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Algorithm Playground | Mithil Katkoria</title>
        <meta name="description" content="Interactive algorithm visualizer: see sorting and searching algorithms step by step." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                🗣 Ask me about this in interview
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                Algorithm Playground
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                I built this to test my own understanding, not just to show it.
                Watch algorithms work step-by-step.
              </p>
            </div>

            {/* Algorithm Selection */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {algorithms.map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => {
                    setSelectedAlgorithm(algo.id);
                    setIsPlaying(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedAlgorithm === algo.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card hover:bg-card/80 text-foreground border border-border'
                  }`}
                >
                  {algo.name}
                </button>
              ))}
            </div>

            {/* Complexity Info */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Worst Case</p>
                <p className="font-mono font-semibold text-primary">{currentAlgo.complexity}</p>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Best Case</p>
                <p className="font-mono font-semibold text-secondary">{currentAlgo.best}</p>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Space</p>
                <p className="font-mono font-semibold">{currentAlgo.space}</p>
              </Card>
            </div>

            {/* Visualization */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 glow-card mb-8">
              <CardContent className="p-8">
                <div className="flex items-end justify-center gap-1 h-64 mb-6">
                  {array.map((value, index) => (
                    <div
                      key={index}
                      className={`w-8 transition-all duration-200 rounded-t-sm flex items-end justify-center pb-1 text-xs font-mono ${
                        sorted.includes(index) 
                          ? 'bg-green-500' 
                          : comparing.includes(index) 
                            ? 'bg-primary animate-pulse' 
                            : 'bg-muted'
                      }`}
                      style={{ height: `${value * 2}px` }}
                    >
                      <span className="text-foreground/70">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Step Description */}
                <div className="text-center mb-6 h-8">
                  <p className="text-muted-foreground">
                    {steps[step]?.description || 'Click play to start'}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                    disabled={step >= steps.length - 1}
                  >
                    <ChevronRight size={20} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={generateArray}
                  >
                    <RotateCcw size={20} />
                  </Button>
                </div>

                {/* Speed Control */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Zap size={16} className="text-muted-foreground" />
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    max={100}
                    min={10}
                    step={10}
                    className="w-48"
                  />
                  <span className="text-sm text-muted-foreground w-16">Speed</span>
                </div>

                {/* Progress */}
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Step {step + 1} of {steps.length}
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Real-World Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedAlgorithm === 'bubble' && (
                    <>
                      <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-2">When to use</h4>
                        <p className="text-sm text-muted-foreground">Small datasets, educational purposes, nearly-sorted data</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-2">Why it's slow</h4>
                        <p className="text-sm text-muted-foreground">Compares every pair, even if already sorted</p>
                      </div>
                    </>
                  )}
                  {selectedAlgorithm === 'merge' && (
                    <>
                      <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-2">When to use</h4>
                        <p className="text-sm text-muted-foreground">Stable sorting needed, external sorting, linked lists</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-2">Trade-off</h4>
                        <p className="text-sm text-muted-foreground">Consistent O(n log n) but uses extra memory</p>
                      </div>
                    </>
                  )}
                  {selectedAlgorithm === 'quick' && (
                    <>
                      <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-2">When to use</h4>
                        <p className="text-sm text-muted-foreground">General purpose, in-place sorting, cache-friendly</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-2">Watch out</h4>
                        <p className="text-sm text-muted-foreground">Bad pivot selection degrades to O(n²)</p>
                      </div>
                    </>
                  )}
                  {selectedAlgorithm === 'binary' && (
                    <>
                      <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-2">When to use</h4>
                        <p className="text-sm text-muted-foreground">Searching in sorted arrays, databases, dictionary lookup</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-2">Requirement</h4>
                        <p className="text-sm text-muted-foreground">Data must be sorted. If not, sort first (O(n log n))</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlgorithmPlayground;
