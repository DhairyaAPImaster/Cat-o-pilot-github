import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cat, Volume2, Gift, Brain, Code, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHorizontalScroll } from '../hooks/useScroll';

const features = [
  {
    icon: Cat,
    title: 'Cat-Powered Explanations',
    description: 'Get your code explained with cat metaphors and puns. Each explanation is unique and engaging.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Volume2,
    title: 'Real Meow Sounds',
    description: 'Immersive audio feedback with authentic cat sounds. Your code reviews just got entertaining.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Gift,
    title: 'Completely Free',
    description: 'No hidden costs, no trials, no credit card. Just install and enjoy unlimited explanations.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Brain,
    title: 'Dual AI Options',
    description: 'Choose HackClub AI (zero setup) or Google Gemini (bring your key) for enhanced capabilities.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code,
    title: 'Multi-Language Support',
    description: 'Works with JavaScript, Python, Java, C++, Go, Rust, and 20+ programming languages.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get instant explanations without leaving your editor. Optimized for speed and efficiency.',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

export function HorizontalFeatures() {
  const sectionRef = useRef(null);
  useHorizontalScroll(sectionRef);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-muted/30 theme-section"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="horizontal-scroll-wrapper will-change-transform">
          <div className="flex gap-8 px-6 py-20">
            <div className="min-w-[400px] flex items-center">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold">
                  Why Developers<br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Love Cat-o-Pilot
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-md">
                  Scroll to explore features →
                </p>
              </div>
            </div>

            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="min-w-[400px] h-[500px] bg-background border border-border rounded-2xl p-8 flex flex-col theme-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  <div className="flex gap-2 mt-6">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                      Popular
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      Free
                    </span>
                  </div>
                </motion.div>
              );
            })}

            <div className="min-w-[400px] flex items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Ready to try?</h3>
                <Link
                  to="/download"
                  className="inline-block bg-primary text-primary-foreground px-8 py-4 font-semibold hover:opacity-90 transition"
                >
                  Install Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
