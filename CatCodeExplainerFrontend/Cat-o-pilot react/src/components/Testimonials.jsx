import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Omer',
    role: 'A random guy on slack who is also a developer',
    avatar: '🐱',
    rating: 5,
    text: 'A stick for ram costs $900 cuz of this. 100% worth it'
  }
];

export function Testimonials() {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <section id="testimonials" className="py-32 px-6 bg-muted/30 theme-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            what people are{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              saying
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            (these are real)
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border p-8 hover:shadow-lg transition theme-card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              Add Your Review ⭐
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-background border border-border p-8 theme-card"
            >
              <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Rating</label>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-4xl transition-all hover:scale-110"
                      >
                        <span className={
                          star <= (hoverRating || rating)
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }>★</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Role</label>
                  <input
                    type="text"
                    placeholder="Full Stack Developer"
                    className="w-full px-4 py-3 bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us what you think about Cat-o-Pilot..."
                    className="w-full px-4 py-3 bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-border hover:bg-muted transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
