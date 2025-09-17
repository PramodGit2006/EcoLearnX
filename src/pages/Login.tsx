import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Leaf, User, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "student"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login logic - replace with actual authentication
    setTimeout(() => {
      if (loginData.email && loginData.password) {
        toast({
          title: "Login Successful! 🌱",
          description: `Welcome back to EcoLearn Play!`,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock signup logic - replace with actual registration
    setTimeout(() => {
      toast({
        title: "Account Created! 🎉",
        description: "Welcome to EcoLearn Play! Your eco-journey begins now.",
      });
      navigate("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4 animate-slide-in-up">
          <div className="flex items-center justify-center space-x-2">
            <Leaf className="h-10 w-10 text-primary animate-glow" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EcoLearn Play
            </h1>
          </div>
          <p className="text-muted-foreground">
            Join the gamified environmental education platform
          </p>
        </div>

        {/* Notice about Supabase */}
        <Card className="glass border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Connect to Supabase for Full Authentication
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  To enable real user authentication, data persistence, and role-based access, 
                  connect your project to Supabase using the green button in the top right corner.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login/Signup Tabs */}
        <Card className="glass animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label>Login as:</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={loginData.userType === "student" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLoginData(prev => ({ ...prev, userType: "student" }))}
                        className="flex-1"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={loginData.userType === "admin" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLoginData(prev => ({ ...prev, userType: "admin" }))}
                        className="flex-1"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>

                  {/* Demo Credentials */}
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Demo credentials:</p>
                    <div className="flex gap-2 justify-center">
                      <Badge variant="outline" className="text-xs">
                        student@eco.com
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        password123
                      </Badge>
                    </div>
                  </div>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Join EcoLearn Play!</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school">School/Organization</Label>
                    <Input
                      id="school"
                      placeholder="Green Valley High School"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Features Preview */}
        <Card className="glass animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">What you'll get:</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Eco Quizzes & Challenges
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                XP Points & Badges
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                Global Leaderboards
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full" />
                Environmental News
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;