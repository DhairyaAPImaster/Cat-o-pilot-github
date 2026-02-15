import { useScrollCatAnimation } from '../hooks/useScroll';

export function ScrollCatAnimation() {
  const { imagePath, scrollProgress } = useScrollCatAnimation();

  return (
    <section id="how" className="relative min-h-[800vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-32 pb-16">
        <div className="w-full h-full flex">
          
          {/* Cat Animation - Left Side */}
          <div className="w-1/2 flex items-center justify-center bg-black p-8">
            <div className="relative w-full max-w-2xl">
              <img
                src={imagePath}
                alt="Scroll animated cat"
                className="w-full h-auto object-contain"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur px-4 py-2 text-sm text-gray-400">
                Scroll to animate 🐾
              </div>
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="w-1/2 flex items-center justify-center bg-black p-12">
            <div className="max-w-xl space-y-8">
              
              <h2 
                className="text-5xl font-bold text-white transition-opacity duration-700"
                style={{ opacity: Math.min(1, scrollProgress * 4) }}
              >
                okay so here's what it does
              </h2>
              
              <p 
                className="text-xl text-gray-300 transition-opacity duration-700"
                style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.1) * 4)) }}
              >
                cat-o-pilot takes confusing code and explains it. but like, with cats. and it makes meow sounds. 
                its actually pretty cool.
              </p>

              <div 
                className="space-y-4 transition-opacity duration-700"
                style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.2) * 4)) }}
              >
                <h3 className="text-2xl font-semibold text-white">two AI models to pick from</h3>
                <p className="text-gray-400">
                  use hackclub ai (no api key, totally free) or plug in your gemini api key. 
                  both work great. both have cats. you decide.
                </p>
              </div>

              <div 
                className="space-y-4 transition-opacity duration-700"
                style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.35) * 4)) }}
              >
                <h3 className="text-2xl font-semibold text-white">actual meow sounds</h3>
                <p className="text-gray-400">
                  real meows. from real cats. probably. 
                  your cat might get confused. or jealous. or both.
                </p>
              </div>

              <div 
                className="space-y-3 transition-opacity duration-700"
                style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.5) * 4)) }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 mt-2"></div>
                  <p className="text-gray-400">Works with any programming language</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 mt-2"></div>
                  <p className="text-gray-400">Lightning-fast explanations in seconds</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 mt-2"></div>
                  <p className="text-gray-400">100% free, no hidden costs ever</p>
                </div>
              </div>

              <div
                className="pt-6 transition-opacity duration-700"
                style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.65) * 3)) }}
              >
                
              </div>

              <div
                className="transition-opacity duration-700"
                style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.8) * 3)) }}
              >
                <p className="text-sm text-gray-500">
                  Keep scrolling to see what our users are saying...
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
