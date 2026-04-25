import { Link } from 'react-router-dom';

export default function History() {
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="font-display font-bold text-3xl mb-4">Upload History</h1>
      <p className="text-muted-foreground mb-4">List of past recordings goes here.</p>
      <Link to="/dashboard" className="text-primary hover:underline text-sm">Return to Dashboard</Link>
    </div>
  );
}
