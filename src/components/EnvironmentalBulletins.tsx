import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Globe, AlertTriangle, TrendingUp, Loader2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  title: string;
  summary: string;
  category: string;
  importance: "high" | "medium" | "low";
  date: string;
}

export const EnvironmentalBulletins = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(true);
  const { toast } = useToast();

  const fetchEnvironmentalNews = async (key: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are an environmental news curator. Provide current environmental news in JSON format with title, summary, category, importance (high/medium/low), and date. Focus on climate change, conservation, renewable energy, and environmental policy. Return exactly 5 news items.'
            },
            {
              role: 'user',
              content: 'Get the latest environmental news from this week. Format as JSON array with fields: title, summary, category, importance, date'
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'week',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (content) {
        try {
          // Try to parse JSON from the response
          let newsData = JSON.parse(content);
          if (!Array.isArray(newsData)) {
            // If it's wrapped in an object, try to extract the array
            newsData = Object.values(newsData)[0];
          }
          setNews(newsData.slice(0, 5)); // Limit to 5 items
          setShowApiInput(false);
          toast({
            title: "Environmental News Updated! 🌍",
            description: "Latest environmental bulletins have been loaded.",
          });
        } catch (parseError) {
          // Fallback to mock data if parsing fails
          setNews(getMockNews());
          setShowApiInput(false);
          toast({
            title: "Using Sample Data",
            description: "Showing sample environmental news.",
          });
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Use mock data as fallback
      setNews(getMockNews());
      setShowApiInput(false);
      toast({
        title: "Using Sample Data",
        description: "Showing sample environmental news due to API error.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMockNews = (): NewsItem[] => [
    {
      title: "Global Renewable Energy Capacity Hits Record High",
      summary: "International Energy Agency reports renewable energy capacity increased by 50% in 2024, with solar leading the growth.",
      category: "Renewable Energy",
      importance: "high",
      date: "2024-03-15"
    },
    {
      title: "New Climate Agreement Reached at COP29",
      summary: "195 countries agree on enhanced carbon reduction targets and increased climate finance for developing nations.",
      category: "Climate Policy",
      importance: "high",
      date: "2024-03-14"
    },
    {
      title: "Amazon Rainforest Deforestation Drops by 30%",
      summary: "Brazilian government reports significant reduction in deforestation rates due to enhanced protection measures.",
      category: "Conservation",
      importance: "medium",
      date: "2024-03-13"
    },
    {
      title: "Ocean Plastic Cleanup Project Removes 100,000 kg",
      summary: "The Ocean Cleanup foundation reaches major milestone in Pacific garbage patch cleanup efforts.",
      category: "Ocean Health",
      importance: "medium",
      date: "2024-03-12"
    },
    {
      title: "European Green Deal Phase 2 Launched",
      summary: "EU announces next phase of green transition with €1 trillion investment in clean technology and infrastructure.",
      category: "Green Economy",
      importance: "high",
      date: "2024-03-11"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "renewable energy":
      case "green economy":
        return <TrendingUp className="h-4 w-4" />;
      case "conservation":
      case "ocean health":
        return <Leaf className="h-4 w-4" />;
      case "climate policy":
        return <Globe className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  if (showApiInput) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Environmental News Bulletins
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Get Real-Time Environmental News
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  To display live environmental bulletins, please enter your Perplexity API key. 
                  This will fetch the latest environmental news from around the world.
                </p>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="api-key">Perplexity API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="pplx-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => fetchEnvironmentalNews(apiKey)}
                      disabled={!apiKey || loading}
                      className="flex-1"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Loading News...
                        </>
                      ) : (
                        <>
                          <Globe className="h-4 w-4 mr-2" />
                          Load Environmental News
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setNews(getMockNews());
                        setShowApiInput(false);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Use Sample Data
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Don't have an API key? Get one from{" "}
                  <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="underline">
                    perplexity.ai
                  </a>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Environmental News Bulletins
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowApiInput(true)}
        >
          Refresh News
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <Badge 
                      variant={getImportanceColor(item.importance) as any}
                      className="text-xs shrink-0"
                    >
                      {item.importance}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-muted-foreground">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {news.length === 0 && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <Globe className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No environmental news available at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};