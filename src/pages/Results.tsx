import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, Lightbulb, UserCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Results() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // 30% representing 0:45 of 2:30
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0; // reset
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Format the progress into mm:ss (assuming total is 150 seconds / 2:30)
  const currentSeconds = Math.floor((progress / 100) * 150);
  const formattedTime = `${Math.floor(currentSeconds / 60)}:${(currentSeconds % 60).toString().padStart(2, '0')}`;
  
  const { id } = useParams<{ id: string }>();

  // Generate random dynamic data on component mount to simulate real analysis per video
  const [{ overallGrade, metrics, fillerWords, suggestions, comparisons }] = useState(() => {
    // Seeded Random Generator based on URL string ID
    const seedString = id || "default-video";
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        hash = Math.imul(31, hash) + seedString.charCodeAt(i) | 0;
    }
    let seed = hash;
    const random = () => {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };

    const grade = (random() * 3 + 6.5).toFixed(1);
    
    const possibleFillers = ['like', 'um', 'basically', 'actually', 'you know', 'right', 'so', 'I mean', 'uh'];
    const shuffledFillers = possibleFillers.sort(() => 0.5 - random());
    const selectedFillers = shuffledFillers.slice(0, 3 + Math.floor(random() * 2));
    const randomFillers = selectedFillers.map(word => ({
      word,
      count: Math.floor(random() * 15) + 3
    })).sort((a, b) => b.count - a.count);

    const metricsData = [
      { name: 'Clarity Index™', score: Math.floor(random() * 20 + 80), color: 'bg-blue-500' },
      { name: 'Confidence Meter™', score: Math.floor(random() * 25 + 70), color: 'bg-purple-500' },
      { name: 'Fluency Score™', score: Math.floor(random() * 15 + 85), color: 'bg-emerald-500' },
    ];

    const possiblePacingSuggestions = [
      { title: "Pacing and Pauses", text: "You tend to speak faster when transitioning between main points. Try pausing for a full 2 seconds after completing a major thought. This gives the audience time to absorb the information and boosts your perceived confidence." },
      { title: "Rhythm and Flow", text: "Your speaking speed is a bit inconsistent. Try to maintain a steady tempo throughout your presentation. Slowing down slightly during key takeaways will help emphasize their importance." },
      { title: "Breathing Room", text: "You rush through complex topics. Remember to let your sentences breathe. Incorporating deliberate, short pauses not only helps you gather your thoughts but also keeps the listener engaged." }
    ];
    
    const possibleFillerSuggestions = [
      { title: "Filler Word Reduction", text: `You used the word "${randomFillers[0]?.word || "like"}" ${randomFillers[0]?.count || 10} times. This usually happens when searching for the next word. When you feel a filler word coming, intentionally close your mouth and take a breath instead.` },
      { title: "Eliminating Crutch Words", text: `The word "${randomFillers[0]?.word || "um"}" appeared ${randomFillers[0]?.count || 8} times, which can distract from your core message. Practice silence as an alternative to filling the void, it makes you sound much more thoughtful.` },
      { title: "Mindful Transitions", text: `You rely on "${randomFillers[0]?.word || "basically"}" during transitions. Try replacing it with a confident transitional phrase or simply embracing a moment of silence to reset your train of thought.` }
    ];

    const possibleComparisons = [
      { init: "SJ", name: "Steve Jobs (Historical Comparison)", text: "Your clarity is excellent, much like Jobs' product presentations. However, Jobs utilized silence masterfully. Watch his 2007 iPhone keynote to see how he uses 3-5 second pauses to build anticipation." },
      { init: "MB", name: "Marques Brownlee (MKBHD)", text: "Your current pacing and tone closely match Marques Brownlee's tech reviews. Notice how he emphasizes key specs with a slight drop in pitch. Practice this technique to sound more authoritative on core subjects." },
      { init: "MO", name: "Michelle Obama", text: "Your measured, articulate style echoes Michelle Obama's inspiring speeches. To improve further, focus on varying your vocal inflection during emotional points, matching her ability to connect personally with the audience." },
      { init: "BB", name: "Brené Brown", text: "You show a vulnerability and authenticity similar to Brené Brown's famous TED talks. Cultivate your storytelling by leaning into your personal anecdotes, while managing your pace to maximize the impact of your punchlines." }
    ];

    const selectedComparisons = possibleComparisons.sort(() => 0.5 - random()).slice(0, 2);

    return {
      overallGrade: grade,
      metrics: metricsData,
      fillerWords: randomFillers,
      suggestions: [
        possiblePacingSuggestions[Math.floor(random() * possiblePacingSuggestions.length)],
        possibleFillerSuggestions[Math.floor(random() * possibleFillerSuggestions.length)]
      ],
      comparisons: selectedComparisons
    };
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <div className="font-display font-bold">Analysis Results</div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/upload">New Upload</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 max-w-6xl">
        {/* Top Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main Grade Card */}
          <Card className="lg:col-span-1 border-border/50 bg-card/60 backdrop-blur-sm shadow-lg flex flex-col items-center justify-center py-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-muted-foreground font-medium">Overall VoxScore™</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-7xl font-display font-extrabold text-foreground">{overallGrade}</span>
                <span className="text-2xl text-muted-foreground font-medium">/ 10</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-medium mt-2">
                <TrendingUp className="w-4 h-4 mr-1.5" /> Good Performance
              </div>
            </CardContent>
          </Card>

          {/* Detailed Metrics */}
          <Card className="lg:col-span-2 border-border/50 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Core Breakdown</CardTitle>
              <CardDescription>Detailed analysis of your speech patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {metrics.map((metric) => (
                <div key={metric.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{metric.name}</span>
                    <span className="text-muted-foreground">{metric.score}/100</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${metric.color} rounded-full`} style={{ width: `${metric.score}%` }}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Audio Playback & Fillers */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                   <Play className="w-5 h-5 text-primary" /> Recording Playback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary rounded-xl p-4 flex items-center gap-4">
                  <Button variant="secondary" size="icon" onClick={() => setIsPlaying(!isPlaying)} className="rounded-full shrink-0 bg-background hover:bg-background/80 shadow-sm">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1">
                    <div className="h-2 w-full bg-background/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all ease-linear" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
                      <span>{formattedTime}</span>
                      <span>2:30</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" /> Filler Tracker™
                </CardTitle>
                <CardDescription>Words detected that disrupt cadence.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {fillerWords.map((fw) => (
                    <div key={fw.word} className="px-3 py-1.5 bg-secondary border border-border rounded-lg flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">"{fw.word}"</span>
                      <span className="bg-background text-foreground text-xs font-bold px-1.5 py-0.5 rounded-md">{fw.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 2: AI Suggestions & Professional Comparisons */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-primary/5 shadow-md border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-primary">
                  <Lightbulb className="w-6 h-6" /> AI Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((sug, idx) => (
                  <div key={idx} className="p-4 bg-background border border-border rounded-xl">
                    <h4 className="font-semibold mb-1">{sug.title}</h4>
                    <p className="text-sm text-muted-foreground">{sug.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 h-8">
                  <UserCheck className="w-6 h-6 text-cyan-500" /> Professional Speaker Comparison
                </CardTitle>
                <CardDescription>Learn from those with similar communication styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {comparisons.map((comp, idx) => (
                  <div key={idx} className={`flex gap-4 items-start ${idx === 0 ? 'pb-4 border-b border-border/50' : 'pt-2'}`}>
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border text-lg font-bold">
                      {comp.init}
                    </div>
                    <div>
                      <h4 className="font-semibold">{comp.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{comp.text}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
