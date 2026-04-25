import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
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
            <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@example.com" className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</Link>
              </div>
              <Input id="password" type="password" className="bg-background/50" />
            </div>
            
            <Button className="w-full mt-6" asChild>
              <Link to="/dashboard">Sign In</Link>
            </Button>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
