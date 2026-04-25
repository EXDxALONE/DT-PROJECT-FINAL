import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <img src="/logo.png" alt="Oratix Logo" className="w-8 h-8 rounded-md object-contain" />
            <span className="font-display font-bold text-xl tracking-tight">Oratix <span className="text-primary text-gradient">AI</span></span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-xl bg-card/60 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display">Create an Account</CardTitle>
            <CardDescription>Start analyzing your speech in seconds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@example.com" className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="bg-background/50" />
            </div>
            
            <Button className="w-full mt-6" asChild>
              <Link to="/upload">Create Account</Link>
            </Button>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
