import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground flex-col">
      <h1 className="text-6xl font-bold font-display tracking-tighter mb-4 text-primary">404</h1>
      <p className="text-muted-foreground mb-8">Page not found</p>
      <Link to="/" className="text-primary hover:underline">Return Home</Link>
    </div>
  );
}
