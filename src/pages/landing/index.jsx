import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, TrendingUp, ArrowRight, CheckCircle2, Clock, DollarSign, Upload, Bot, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process claims in minutes, not days. Our AI-powered system analyzes and validates claims instantly.'
  },
  {
    icon: Shield,
    title: 'Fraud Detection',
    description: 'Advanced ML algorithms detect fraudulent claims with 99.7% accuracy, protecting your business.'
  },
  {
    icon: TrendingUp,
    title: 'Zero Touch',
    description: 'Fully automated processing from submission to settlement. No manual intervention required.'
  }];


  const benefits = [
  'Reduce processing time by 90%',
  'Lower operational costs significantly',
  'Improve customer satisfaction',
  'Real-time claim tracking',
  'Intelligent damage assessment',
  'Automated fraud screening'];


  const howItWorksSteps = [
  {
    step: '1',
    icon: Upload,
    title: 'Upload Claim',
    description: 'User uploads photo + incident details'
  },
  {
    step: '2',
    icon: Bot,
    title: 'Agents Assess & Validate',
    description: 'AI agents autonomously analyze damage, check coverage, screen for fraud'
  },
  {
    step: '3',
    icon: Sparkles,
    title: 'Instant Settlement',
    description: 'A settlement is generated in seconds for low-complexity claims'
  }];


  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ClaimFlow AI</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Benefits
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/claims-adjuster-dashboard')}>

                Dashboard
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Claims Processing</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">Vehicle Insurance Claims, Settled Instantly

          </h1>
          
          <p className="text-xl text-primary mb-10 font-medium">Reduce adjuster workload and cycle time with AI that processes claims autonomously: from FNOL to payout.

          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="xl"
              onClick={() => navigate('/fnol-intake-form')}
              iconName="ArrowRight"
              iconPosition="right"
              className="w-full sm:w-auto">

              File a New Claim
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => navigate('/claims-adjuster-dashboard')}
              className="w-full sm:w-auto">

              View Dashboard
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>24/7 Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-success" />
              <span>Instant Settlements</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our agentic workflow delivers end-to-end automation from claim submission to settlement
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorksSteps?.map((item, index) => {
            const IconComponent = item?.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">

                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-primary-foreground">{item?.step}</span>
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                  {item?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  {item?.description}
                </p>
              </div>);

          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 bg-card/30 rounded-3xl my-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Powered by the most sophisticated AI Agents

          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our multi-agent system orchestrates intelligent workflows for seamless claims processing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features?.map((feature, index) => {
            const IconComponent = feature?.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>);

          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose ClaimFlow AI?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of insurance companies transforming their claims operations 
              with intelligent automation and real-time processing.
            </p>
            <div className="space-y-4">
              {benefits?.map((benefit, index) =>
              <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 border border-primary/20">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Submit Your Claim</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload photos and incident details through our intuitive form
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">AI Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Multi-agent system validates, assesses, and screens for fraud
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Instant Settlement</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive settlement offer and payment within minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-primary to-primary rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Claims Process?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-[rgba(237,237,237,1)]">Join the future of insurance claims processing. File your first claim in under 5 minutes.

          </p>
          <Button
            variant="secondary"
            size="xl"
            onClick={() => navigate('/fnol-intake-form')}
            iconName="ArrowRight"
            iconPosition="right">

            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">ClaimFlow AI</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 ClaimFlow AI. Powered by advanced artificial intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default LandingPage;