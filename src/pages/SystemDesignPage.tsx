import { Helmet } from "react-helmet";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Database, Server, Shield, Cloud, HardDrive, BarChart3, Users, FileText, Lock, Zap, ArrowRight, ArrowDown } from "lucide-react";

type Scale = "100" | "10000" | "1000000";

interface ScaleConfig {
  users: string;
  requests: string;
  storage: string;
  architecture: {
    frontend: string;
    api: string;
    auth: string;
    database: string;
    storage: string;
    cache: string;
    monitoring: string;
  };
  tradeoffs: string[];
  dbNotes: string[];
}

const scaleConfigs: Record<Scale, ScaleConfig> = {
  "100": {
    users: "100 users",
    requests: "~50 req/min peak",
    storage: "~10 GB",
    architecture: {
      frontend: "Single SPA, CDN optional",
      api: "Single Node.js server",
      auth: "Session-based, cookies",
      database: "Single PostgreSQL instance",
      storage: "Local filesystem or S3",
      cache: "In-memory (Node.js)",
      monitoring: "Basic logging, Sentry"
    },
    tradeoffs: [
      "Simplicity over scalability: A single server is easier to debug and deploy.",
      "Session auth is simpler than JWT for small user bases.",
      "No need for Redis—application memory is sufficient."
    ],
    dbNotes: [
      "Simple schema, minimal indexing",
      "No read replicas needed",
      "Backups via pg_dump"
    ]
  },
  "10000": {
    users: "10,000 users",
    requests: "~500 req/min peak",
    storage: "~500 GB",
    architecture: {
      frontend: "SPA + CDN (CloudFront/Vercel)",
      api: "Load-balanced Node.js (2-3 instances)",
      auth: "JWT with refresh tokens",
      database: "PostgreSQL with read replica",
      storage: "S3 with signed URLs",
      cache: "Redis for sessions & hot data",
      monitoring: "APM (Datadog/New Relic), alerting"
    },
    tradeoffs: [
      "JWT enables stateless API servers, simplifying horizontal scaling.",
      "Read replica reduces load on primary database for heavy read operations.",
      "Redis adds operational complexity but is necessary for shared session state."
    ],
    dbNotes: [
      "Indexes on common queries (user_id, assignment_id, created_at)",
      "Read replica for report generation",
      "Point-in-time recovery enabled"
    ]
  },
  "1000000": {
    users: "1,000,000 users",
    requests: "~10,000 req/min peak",
    storage: "~50 TB",
    architecture: {
      frontend: "Multi-region CDN, edge caching",
      api: "Kubernetes cluster, auto-scaling",
      auth: "Distributed auth service, OAuth2",
      database: "Sharded PostgreSQL + read replicas",
      storage: "Multi-region S3 with lifecycle policies",
      cache: "Redis cluster, multi-tier caching",
      monitoring: "Full observability stack, distributed tracing"
    },
    tradeoffs: [
      "Sharding enables horizontal scaling but complicates queries across shards.",
      "Multi-region deployment improves latency but increases consistency complexity.",
      "Kubernetes adds operational overhead but enables automated scaling and recovery."
    ],
    dbNotes: [
      "Sharded by school_id for data locality",
      "Read replicas per region",
      "Warm standby for disaster recovery",
      "Partitioned tables for time-series data (submissions)"
    ]
  }
};

const SystemDesignPage = () => {
  const [scale, setScale] = useState<Scale>("100");
  const config = scaleConfigs[scale];

  const architectureComponents = [
    { key: "frontend", label: "Frontend", icon: Users, color: "text-blue-400" },
    { key: "api", label: "API Layer", icon: Server, color: "text-green-400" },
    { key: "auth", label: "Auth", icon: Shield, color: "text-amber-400" },
    { key: "database", label: "Database", icon: Database, color: "text-purple-400" },
    { key: "storage", label: "File Storage", icon: HardDrive, color: "text-pink-400" },
    { key: "cache", label: "Cache", icon: Zap, color: "text-cyan-400" },
    { key: "monitoring", label: "Monitoring", icon: BarChart3, color: "text-orange-400" }
  ];

  return (
    <>
      <Helmet>
        <title>System Design | Mithil Katkoria</title>
        <meta name="description" content="A live system design case study demonstrating architectural thinking across different scales." />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <StarfieldBackground />
        <div className="relative z-10">
          <Navigation />
          <div className="pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4">
              {/* Hero */}
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
                  Designing Systems
                </h1>
                <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                  "I enjoy thinking about systems, not just code."
                </p>
              </div>

              {/* Scale Toggle */}
              <div className="flex justify-center mb-12">
                <div className="inline-flex bg-muted rounded-lg p-1">
                  {(["100", "10000", "1000000"] as Scale[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        scale === s
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {s === "100" ? "100 users" : s === "10000" ? "10K users" : "1M users"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Case Study Header */}
              <Card className="bg-card/50 border-primary/20 mb-8">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">Case Study: Secure Homework Submission Platform</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        A platform for students to submit assignments securely, with teacher feedback and grading.
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Current Scale Info */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <Card className="bg-card/50 border-border/50 text-center p-4">
                  <p className="text-2xl font-bold text-primary">{config.users}</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </Card>
                <Card className="bg-card/50 border-border/50 text-center p-4">
                  <p className="text-2xl font-bold text-primary">{config.requests}</p>
                  <p className="text-xs text-muted-foreground">Peak Load</p>
                </Card>
                <Card className="bg-card/50 border-border/50 text-center p-4">
                  <p className="text-2xl font-bold text-primary">{config.storage}</p>
                  <p className="text-xs text-muted-foreground">Storage</p>
                </Card>
              </div>

              {/* Requirements */}
              <Card className="bg-card/50 border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Functional</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Students can upload assignments (PDF, documents, code)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Teachers can view, annotate, and grade submissions
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Deadline enforcement with late submission tracking
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Plagiarism detection integration
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Non-Functional</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-1">•</span>
                          99.9% availability during submission windows
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-1">•</span>
                          Sub-second response for UI interactions
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-1">•</span>
                          GDPR-compliant data handling
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-1">•</span>
                          Audit trail for all grade modifications
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Architecture Diagram */}
              <Card className="bg-card/50 border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-primary" />
                    Architecture @ {config.users}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {architectureComponents.map((comp) => {
                      const Icon = comp.icon;
                      const value = config.architecture[comp.key as keyof typeof config.architecture];
                      return (
                        <div 
                          key={comp.key}
                          className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-4 h-4 ${comp.color} group-hover:scale-110 transition-transform`} />
                            <span className="text-sm font-medium">{comp.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{value}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Flow Diagram */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
                    <span className="px-3 py-2 bg-blue-400/10 text-blue-400 rounded-lg">Client</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="px-3 py-2 bg-cyan-400/10 text-cyan-400 rounded-lg">CDN</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="px-3 py-2 bg-green-400/10 text-green-400 rounded-lg">API</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="px-3 py-2 bg-purple-400/10 text-purple-400 rounded-lg">DB</span>
                  </div>
                </CardContent>
              </Card>

              {/* Database Schema */}
              <Card className="bg-card/50 border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    Database Schema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-4">
                      <div className="p-3 bg-muted/30 rounded-lg font-mono text-xs">
                        <p className="text-purple-400 font-semibold mb-2">users</p>
                        <p className="text-muted-foreground">id, email, role, school_id, created_at</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg font-mono text-xs">
                        <p className="text-blue-400 font-semibold mb-2">assignments</p>
                        <p className="text-muted-foreground">id, title, teacher_id, deadline, created_at</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-muted/30 rounded-lg font-mono text-xs">
                        <p className="text-green-400 font-semibold mb-2">submissions</p>
                        <p className="text-muted-foreground">id, assignment_id, student_id, file_url, submitted_at</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg font-mono text-xs">
                        <p className="text-amber-400 font-semibold mb-2">grades</p>
                        <p className="text-muted-foreground">id, submission_id, score, feedback, graded_at</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Scale-specific notes:</h4>
                    <ul className="space-y-2">
                      {config.dbNotes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Trade-offs */}
              <Card className="bg-primary/5 border-primary/20 mb-12">
                <CardHeader>
                  <CardTitle className="text-lg">Trade-offs @ {config.users}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {config.tradeoffs.map((tradeoff, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary shrink-0 mt-0.5">
                          {i + 1}
                        </Badge>
                        <p className="text-muted-foreground text-sm leading-relaxed">{tradeoff}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Reflection */}
              <div className="p-6 bg-card/50 rounded-lg border border-primary/20 text-center">
                <Quote className="w-6 h-6 text-primary mx-auto mb-4" />
                <p className="text-foreground italic text-lg">
                  "System design is choosing which problems you want to have."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemDesignPage;
