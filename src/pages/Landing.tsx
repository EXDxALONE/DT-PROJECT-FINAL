import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic, BarChart, Zap } from 'lucide-react';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Dynamic Background Shader */}
      <WebGLShader />

      {/* Navbar */}
      <header className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Oratix Logo" className="w-8 h-8 rounded-md object-contain" />
            <span className="font-display font-bold text-xl tracking-tight">Oratix <span className="text-primary text-gradient">AI</span></span>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-muted-foreground">
            <Link to="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link to="#demo" className="hover:text-foreground transition-colors">Demo</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Log in</Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center z-10">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 text-sm font-medium rounded-full bg-secondary/80 backdrop-blur-xl text-secondary-foreground border border-border">
          <span className="flex w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          AI-Powered Communication Analysis
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
          Upload Your Voice. <br />
          <span className="text-gradient">Improve Instantly.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Get actionable feedback on your clarity, confidence, and tone. Oratix AI breaks down your speech so you can present like a pro.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/upload">
            <LiquidButton className="text-white border-primary/50" size="xl">
              Upload Audio Now
            </LiquidButton>
          </Link>
          
          <Button size="lg" variant="outline" className="px-8 h-12 text-base font-medium rounded-xl border-border hover:bg-secondary/80 backdrop-blur-md bg-background/20" asChild>
            <Link to="/results/demo">See Demo Results</Link>
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto w-full text-left">
          <div className="bg-card/50 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-lg flex flex-col gap-3 transition-transform hover:scale-105 duration-300">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg">VoxScore™ Analysis</h3>
            <p className="text-sm text-muted-foreground">Our proprietary AI grades your speech on confidence, clarity, and fluency instantly.</p>
          </div>
          <div className="bg-card/50 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-lg flex flex-col gap-3 transition-transform hover:scale-105 duration-300">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="font-display font-bold text-lg">Filler Tracker™</h3>
            <p className="text-sm text-muted-foreground">Identify crutch words like "um", "ah", and "like" so you can sound more professional.</p>
          </div>
          <div className="bg-card/50 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-lg flex flex-col gap-3 transition-transform hover:scale-105 duration-300">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center shrink-0">
              <BarChart className="w-5 h-5 text-cyan-500" />
            </div>
            <h3 className="font-display font-bold text-lg">Detailed Suggestions</h3>
            <p className="text-sm text-muted-foreground">Receive actionable tips to improve your pacing, tone, and overall delivery.</p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border mt-auto py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Oratix AI. MVP Project developed with React & modern web tech.
        </div>
      </footer>
    </div>
  );
}
