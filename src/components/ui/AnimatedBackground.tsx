/**
 * AnimatedBackground Component
 * 
 * Renders a full-screen animated gradient background with floating blobs
 * and a subtle noise texture overlay. Performance-optimized with CSS animations.
 * 
 * Usage:
 * <AnimatedBackground />
 */
export function AnimatedBackground() {
  return (
    <>
      <div className="animated-bg">
        <div className="gradient-blob gradient-blob-1" />
        <div className="gradient-blob gradient-blob-2" />
        <div className="gradient-blob gradient-blob-3" />
      </div>
      <div className="noise-overlay" />
    </>
  );
}
