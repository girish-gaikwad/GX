"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  Book,
  Sparkles,
  FileInput,
  GanttChartSquare,
  Timer,
  List,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DocumentSummarizer = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryLength, setSummaryLength] = useState(50);
  const [summaryStyle, setSummaryStyle] = useState("concise");
  const { theme } = useTheme();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Unsupported file type. Please upload PDF, DOC, DOCX, or TXT files.');
        return;
      }

      setFile(selectedFile);
      setError(null);
      setSummary(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
  
    setIsProcessing(true);
    setError(null);
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('summaryLength', summaryLength.toString());
    formData.append('summaryStyle', summaryStyle);
  
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to process document');
      }
  
      const summary = await response.json();
      setSummary(summary);
    } catch (err) {
      setError('Failed to process document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='mt-10'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Book className="text-gray-600 dark:text-gray-400" size={32} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Document Summarizer</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative cursor-pointer"
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                />
                <div className="border-2 border-dashed rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-700/50">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    Drop your document here or click to browse
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Supports PDF, DOC, DOCX, and TXT files
                  </p>
                </div>
              </motion.div>

              {file && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-blue-700 dark:text-blue-300">{file.name}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 mb-2 block">
                    Summary Length
                  </label>
                  <Slider
                    value={[summaryLength]}
                    onValueChange={(value) => setSummaryLength(value[0])}
                    min={10}
                    max={90}
                    step={10}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Brief</span>
                    <span>{summaryLength}%</span>
                    <span>Detailed</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 mb-2 block">
                    Summary Style
                  </label>
                  <Select value={summaryStyle} onValueChange={setSummaryStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="simplified">Simplified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={!file || isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin">
                      <Zap className="h-5 w-5" />
                    </span>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Summary
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Summary Results Section */}
          <div className="relative">
            {summary ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Summary Generated</h3>
                </div>

                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="key-points">Key Points</TabsTrigger>
                    <TabsTrigger value="topics">Topics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="mt-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <p className="text-gray-700 dark:text-gray-200">
                        {summary.mainSummary}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="key-points" className="mt-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <ul className="space-y-2">
                        {summary.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                            <List className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="topics" className="mt-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex flex-wrap gap-2">
                        {summary.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Upload a document to generate its summary
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentSummarizer;