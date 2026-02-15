import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 theme-section theme-cta">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-6xl animate-bounce">🐱</div>
          
          <h2 className="text-5xl font-bold">
            alright, you convinced?{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              just try it
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            its free. it has cats. it explains code. what more do you want (btw if u want more email sugestions at - dhairyakhannabuiss@gmail.com)?
          </p>

          <Link
            to="/download"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 font-bold text-lg hover:opacity-90 transition shadow-2xl hover:shadow-3xl"
          >
            <Download className="w-6 h-6" />
            download it already
          </Link>

          <div className="flex justify-center gap-8 text-sm text-muted-foreground pt-4">
            <div>✓ Windows</div>
            <div>✓ macOS</div>
            <div>✓ Linux</div>
          </div>

          <p className="text-sm text-muted-foreground">
            Compatible with VS Code 1.80+ • Latest version: 2.1.0
          </p>
        </motion.div>
      </div>
    </section>
  );
}
