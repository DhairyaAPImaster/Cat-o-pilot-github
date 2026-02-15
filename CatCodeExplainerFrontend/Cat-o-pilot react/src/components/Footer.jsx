export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12 px-6 theme-section">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐱</span>
            <span className="font-bold">Cat-o-Pilot</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Making code explanations purr-fect since 2024
          </p>
          <p className="text-sm text-muted-foreground">
            © 2026 Cat-o-Pilot. Made with 💙 and lots of cat videos
          </p>
        </div>
      </div>
    </footer>
  );
}
