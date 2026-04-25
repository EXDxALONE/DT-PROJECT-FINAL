import { useState, useRef } from 'react';
import { UploadCloud, FileAudio, X, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (selectedFile: File) => {
    setError(null);
    const validTypes = ['audio/mpeg', 'audio/wav', 'video/mp4'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Only MP4, MP3, and WAV are supported.');
      return false;
    }
    if (selectedFile.size > maxSize) {
      setError('File size exceeds the 50MB limit.');
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            localStorage.setItem('lastUploadedFile', JSON.stringify({
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
              date: new Date().toLocaleDateString()
            }));
            // navigate('/results/mock-id-123');
            navigate('/results/' + encodeURIComponent(file.name));
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Simple Header */}
      <header className="border-b border-border/40 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80">
          <img src="/logo.png" alt="Oratix Logo" className="w-8 h-8 rounded-md" />
          <span className="font-display font-bold text-lg tracking-tight">Oratix <span className="text-primary text-gradient">AI</span></span>
        </Link>
        <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">
          Dashboard
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <Card className="max-w-2xl w-full p-8 rounded-2xl shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Upload Recording</h1>
            <p className="text-muted-foreground">Select an audio or video file to analyze your communication skills.</p>
          </div>

          <div
            className={`border-2 border-dashed rounded-xl p-12 transition-colors flex flex-col items-center justify-center text-center cursor-pointer mb-6 ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/20'
            } ${file ? 'hidden' : 'block'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/mp3,audio/wav,video/mp4"
            />
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Click to upload or drag and drop</h3>
            <p className="text-sm text-muted-foreground">MP4, MP3, or WAV (maximum 50MB)</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 mb-6">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {file && (
            <div className="bg-secondary/40 border border-border rounded-xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FileAudio className="w-5 h-5 text-primary" />
                </div>
                <div className="truncate text-left">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              {!isUploading && (
                <button onClick={clearFile} className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {isUploading && (
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Analyzing audio...
                </span>
                <span className="font-medium text-primary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate(-1)} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!file || isUploading} className="min-w-[120px]">
              {isUploading ? 'Processing...' : 'Analyze'}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
