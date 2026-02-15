import { motion } from 'framer-motion';
import { useState } from 'react';

const catImages = [
  { src: '/assets/thinking cat.png', title: 'Thinking Cat', desc: 'Deep in thought about your code' },
  { src: '/assets/loading cat.png', title: 'Loading Cat', desc: 'Processing your request' },
  { src: '/assets/error cat.png', title: 'Error Cat', desc: 'Something went wrong' },
  { src: '/assets/final response provided cat.png', title: 'Success Cat', desc: 'Explanation ready!' }
];

export function CatGallery() {
  const [selectedCat, setSelectedCat] = useState(null);

  return (
    <section id="gallery" className="py-32 px-6 bg-background theme-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Meet Our Code-Explaining{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cats
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Each cat has a unique personality and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {catImages.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
              onClick={() => setSelectedCat(cat)}
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={cat.src}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-bold text-xl mb-1">{cat.title}</h3>
                    <p className="text-sm opacity-90">{cat.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedCat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedCat(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedCat.src}
              alt={selectedCat.title}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <h3 className="text-3xl font-bold text-white mb-2">{selectedCat.title}</h3>
              <p className="text-white/80">{selectedCat.desc}</p>
            </div>
            <button
              onClick={() => setSelectedCat(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
