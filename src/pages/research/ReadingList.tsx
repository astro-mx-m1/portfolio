import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, Library } from "lucide-react";

const ReadingList = () => {
  const readings = {
    philosophy: [
      { title: "An Essay Concerning Human Understanding", author: "John Locke", status: "Read" },
      { title: "The Structure of Scientific Revolutions", author: "Thomas Kuhn", status: "Reading" },
      { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", status: "Reading" }
    ],
    ai: [
      { title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", status: "Reading" },
      { title: "The Alignment Problem", author: "Brian Christian", status: "To Read" },
      { title: "Life 3.0", author: "Max Tegmark", status: "Read" }
    ],
    mathematics: [
      { title: "The Art of Computer Programming", author: "Donald Knuth", status: "In Progress" },
      { title: "Introduction to Algorithms", author: "CLRS", status: "Reference" },
      { title: "Discrete Mathematics and Its Applications", author: "Kenneth Rosen", status: "Read" }
    ]
  };

  const renderSection = (title: string, icon: any, books: any[]) => {
    const Icon = icon;
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 glow-card">
        <div className="flex items-center gap-3 mb-6">
          <Icon className="text-primary" size={28} />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="space-y-3">
          {books.map((book, index) => (
            <div key={index} className="flex items-start justify-between p-3 bg-muted/20 rounded-lg">
              <div>
                <h3 className="font-semibold mb-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
              <Badge 
                variant={book.status === "Read" ? "default" : "secondary"}
                className="text-xs"
              >
                {book.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Reading List | Mithil Katkoria</title>
        <meta name="description" content="Books and papers shaping my understanding of AI, philosophy, mathematics, and computer science." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Reading List
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Books and papers that have shaped my thinking about technology, philosophy, and the nature of intelligence.
            </p>

            <div className="space-y-6">
              {renderSection("Philosophy & Cognition", BookOpen, readings.philosophy)}
              {renderSection("Artificial Intelligence", Book, readings.ai)}
              {renderSection("Mathematics & CS Theory", Library, readings.mathematics)}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReadingList;