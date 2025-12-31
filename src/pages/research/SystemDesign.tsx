import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Server, Database, Users, Shield, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react";

const SystemDesign = () => {
  const [scale, setScale] = useState<'small' | 'medium' | 'large'>('small');

  const scaleConfig = {
    small: { users: "100", requests: "10/sec", db: "Single Instance", cache: "None", cdn: "None" },
    medium: { users: "10,000", requests: "100/sec", db: "Read Replicas", cache: "Redis", cdn: "CloudFlare" },
    large: { users: "1,000,000", requests: "10,000/sec", db: "Sharded Cluster", cache: "Distributed Redis", cdn: "Multi-Region CDN" }
  };

  const currentScale = scaleConfig[scale];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>System Design Case Study | Mithil Katkoria</title>
        <meta name="description" content="Live system design case study: designing a secure, scalable homework submission platform from scratch." />
      </Helmet>
      
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                🗣 Ask me about this in interview
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
                System Design Case Study
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Designing a secure school homework submission platform from scratch.
                Toggle the scale to see how architecture evolves with growth.
              </p>
            </div>

            <Card className="mb-8 bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Scale Simulation</h3>
                    <p className="text-sm text-muted-foreground">See how the architecture changes at different scales</p>
                  </div>
                  <div className="flex gap-2">
                    {(['small', 'medium', 'large'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setScale(s)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          scale === s 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                        }`}
                      >
                        {s === 'small' ? '100 Users' : s === 'medium' ? '10K Users' : '1M Users'}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-5 gap-4 mb-12">
              {[
                { label: "Users", value: currentScale.users, icon: Users },
                { label: "Requests", value: currentScale.requests, icon: Zap },
                { label: "Database", value: currentScale.db, icon: Database },
                { label: "Cache", value: currentScale.cache, icon: Server },
                { label: "CDN", value: currentScale.cdn, icon: Globe }
              ].map((item, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur-sm border-primary/20 text-center p-4">
                  <item.icon className="text-primary mx-auto mb-2" size={24} />
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-semibold text-sm">{item.value}</p>
                </Card>
              ))}
            </div>

            {/* Architecture Diagram */}
            <Card className="mb-12 bg-card/50 backdrop-blur-sm border-primary/20 glow-card overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="text-primary" />
                  Architecture Diagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background/50 rounded-lg p-8 border border-border/50">
                  {/* Simple ASCII-style architecture */}
                  <div className="flex flex-col items-center gap-6 text-sm font-mono">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 border border-primary/40 rounded-lg p-4 text-center">
                        <Users className="mx-auto mb-2 text-primary" size={20} />
                        <p>Clients</p>
                        <p className="text-xs text-muted-foreground">{currentScale.users}</p>
                      </div>
                    </div>
                    
                    <ArrowRight className="rotate-90 text-primary" />
                    
                    {scale !== 'small' && (
                      <>
                        <div className="bg-secondary/20 border border-secondary/40 rounded-lg p-4 text-center">
                          <Globe className="mx-auto mb-2 text-secondary" size={20} />
                          <p>CDN Layer</p>
                          <p className="text-xs text-muted-foreground">{currentScale.cdn}</p>
                        </div>
                        <ArrowRight className="rotate-90 text-primary" />
                      </>
                    )}
                    
                    <div className="bg-primary/20 border border-primary/40 rounded-lg p-4 text-center">
                      <Shield className="mx-auto mb-2 text-primary" size={20} />
                      <p>API Gateway</p>
                      <p className="text-xs text-muted-foreground">Auth + Rate Limiting</p>
                    </div>
                    
                    <ArrowRight className="rotate-90 text-primary" />
                    
                    <div className="flex items-center gap-4">
                      {scale === 'large' && (
                        <>
                          <div className="bg-muted border border-border rounded-lg p-3 text-center">
                            <Server className="mx-auto mb-1" size={16} />
                            <p className="text-xs">Server 1</p>
                          </div>
                          <div className="bg-muted border border-border rounded-lg p-3 text-center">
                            <Server className="mx-auto mb-1" size={16} />
                            <p className="text-xs">Server 2</p>
                          </div>
                          <div className="bg-muted border border-border rounded-lg p-3 text-center">
                            <Server className="mx-auto mb-1" size={16} />
                            <p className="text-xs">Server N</p>
                          </div>
                        </>
                      )}
                      {scale !== 'large' && (
                        <div className="bg-muted border border-border rounded-lg p-4 text-center">
                          <Server className="mx-auto mb-2" size={20} />
                          <p>Application Server</p>
                        </div>
                      )}
                    </div>
                    
                    <ArrowRight className="rotate-90 text-primary" />
                    
                    <div className="flex items-center gap-6">
                      {scale !== 'small' && (
                        <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg p-4 text-center">
                          <Zap className="mx-auto mb-2 text-orange-400" size={20} />
                          <p>Cache</p>
                          <p className="text-xs text-muted-foreground">{currentScale.cache}</p>
                        </div>
                      )}
                      <div className="bg-secondary/20 border border-secondary/40 rounded-lg p-4 text-center">
                        <Database className="mx-auto mb-2 text-secondary" size={20} />
                        <p>Database</p>
                        <p className="text-xs text-muted-foreground">{currentScale.db}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database Schema */}
            <Card className="mb-12 bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="text-primary" />
                  Database Schema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      table: "users", 
                      columns: ["id (UUID, PK)", "email (VARCHAR)", "role (ENUM)", "school_id (FK)", "created_at"] 
                    },
                    { 
                      table: "assignments", 
                      columns: ["id (UUID, PK)", "title (VARCHAR)", "due_date (TIMESTAMP)", "teacher_id (FK)", "class_id (FK)"] 
                    },
                    { 
                      table: "submissions", 
                      columns: ["id (UUID, PK)", "student_id (FK)", "assignment_id (FK)", "file_url (TEXT)", "submitted_at", "grade"] 
                    }
                  ].map((schema, i) => (
                    <div key={i} className="bg-background/50 rounded-lg border border-border/50 overflow-hidden">
                      <div className="bg-primary/20 px-4 py-2 font-mono font-semibold text-primary">
                        {schema.table}
                      </div>
                      <div className="p-4 space-y-1">
                        {schema.columns.map((col, j) => (
                          <p key={j} className="text-sm font-mono text-muted-foreground">{col}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trade-offs */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Key Trade-offs Considered</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    decision: "PostgreSQL over MongoDB", 
                    reason: "Structured data with complex relationships (users, classes, assignments). ACID compliance critical for grades."
                  },
                  { 
                    decision: "Server-side rendering for submissions list", 
                    reason: "SEO not needed, but SSR reduces client bundle and improves time-to-interactive."
                  },
                  { 
                    decision: "S3 for file storage with signed URLs", 
                    reason: "Direct uploads reduce server load. Signed URLs provide secure, time-limited access."
                  },
                  { 
                    decision: "Row-Level Security over application logic", 
                    reason: "Defense in depth. Even if application code has bugs, database enforces access rules."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50">
                    <CheckCircle className="text-primary mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-semibold text-foreground">{item.decision}</p>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-8 text-center">
                <blockquote className="text-2xl font-medium italic text-foreground/90">
                  "I enjoy thinking about systems, not just code."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemDesign;
