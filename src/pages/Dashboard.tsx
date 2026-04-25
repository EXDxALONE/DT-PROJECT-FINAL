import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Play, Clock, ArrowRight, BarChart2, Mic, Settings, LayoutDashboard } from 'lucide-react';

interface UploadedFile {
  name: string;
  size: string;
  date: string;
}

export default function Dashboard() {
  const [recentFile, setRecentFile] = useState<UploadedFile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('lastUploadedFile');
    if (saved) {
      try {
        setRecentFile(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-card/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-border/40">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <img src="/logo.png" alt="Oratix Logo" className="w-8 h-8 rounded-md" />
            <span className="font-display font-bold text-xl tracking-tight">Oratix <span className="text-primary text-gradient">AI</span></span>
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Button variant="secondary" className="justify-start gap-3 bg-secondary/50">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-3 hover:bg-secondary/40">
            <Mic className="w-4 h-4" /> Practice Area
          </Button>
          <Button variant="ghost" className="justify-start gap-3 hover:bg-secondary/40">
            <BarChart2 className="w-4 h-4" /> Analytics
          </Button>
        </nav>
        <div className="p-4 mt-auto">
          <Button variant="ghost" className="justify-start w-full gap-3 hover:bg-secondary/40">
            <Settings className="w-4 h-4" /> Settings
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 border-b border-border/40 px-8 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-40">
          <h2 className="font-semibold">Overview</h2>
          <div className="flex gap-4 items-center">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Sign Out</Link>
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-sm font-bold text-primary">
              R
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          
          {/* Welcome & CTA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/30 p-6 sm:p-8 rounded-3xl border border-border/50 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <h1 className="font-display font-bold text-3xl mb-2">Welcome Back! ✨</h1>
              <p className="text-muted-foreground">Ready to improve your communication skills today?</p>
            </div>
            <Button size="lg" onClick={() => navigate('/upload')} className="gap-2 shadow-[0_0_20px_rgba(var(--primary),0.3)] relative z-10">
              <Plus className="w-5 h-5" /> New Analysis
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average VoxScore™</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold text-emerald-400">8.2<span className="text-xl text-muted-foreground"> /10</span></div>
                <p className="text-xs text-emerald-500 mt-1 flex gap-1 items-center">↑ 4% from last week</p>
              </CardContent>
            </Card>
            <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Analyzed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">14<span className="text-xl text-muted-foreground"> sessions</span></div>
                <p className="text-xs text-muted-foreground mt-1">Over 2.5 hours of audio</p>
              </CardContent>
            </Card>
            <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold text-purple-400">Clarity</div>
                <p className="text-xs text-muted-foreground mt-1">Reduced filler words by 30%</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Uploads Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-display font-semibold">Your Recent Uploads</h3>
              <Button variant="link" className="text-sm text-primary p-0">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentFile ? (
                <Card className="bg-card/40 border-border/50 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group" onClick={() => navigate('/results/' + encodeURIComponent(recentFile.name))}>
                  <div className="h-32 bg-secondary/50 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50"></div>
                    <Play className="w-10 h-10 text-primary/80 group-hover:scale-110 group-hover:text-primary transition-all" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm truncate mb-1">{recentFile.name}</h4>
                    <div className="flex items-center text-xs text-muted-foreground gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recentFile.date}</span>
                      <span>{recentFile.size}</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card/20 border-dashed border-border flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
                  <div className="w-12 h-12 rounded-full border border-dashed border-muted-foreground/30 flex items-center justify-center mb-3">
                    <Mic className="w-5 h-5 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm text-muted-foreground">No recent uploads yet</p>
                  <Button variant="link" onClick={() => navigate('/upload')} className="mt-2 text-sm">Start your first analysis</Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
