import { useEffect, useState, useMemo } from "react";

const StarfieldBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate star data with different layers for parallax - memoized to prevent re-generation
  const stars = useMemo(() => {
    const generateStars = (count: number, layer: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: `${layer}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 200,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        twinkleDelay: Math.random() * 4,
        twinkleDuration: Math.random() * 2 + 2,
        layer
      }));
    };

    return [
      ...generateStars(80, 1),  // Reduced from 150
      ...generateStars(50, 2),  // Reduced from 100
      ...generateStars(30, 3),  // Reduced from 70
    ];
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))]" />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => {
          // Parallax effect: different layers move at different speeds
          const parallaxSpeed = star.layer === 1 ? 0.05 : star.layer === 2 ? 0.15 : 0.3;
          const yOffset = scrollY * parallaxSpeed;
          
          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white will-change-transform"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                transform: `translate3d(0, -${yOffset}px, 0)`,
                animation: `glow-pulse ${star.twinkleDuration}s ease-in-out infinite`,
                animationDelay: `${star.twinkleDelay}s`,
                boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.3)`
              }}
            />
          );
        })}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: '20%',
            top: '20%',
            animation: 'shootingStar 3s ease-in-out infinite',
            animationDelay: '0s',
            boxShadow: '0 0 10px 2px hsl(var(--primary))'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-secondary rounded-full"
          style={{
            left: '60%',
            top: '10%',
            animation: 'shootingStar 4s ease-in-out infinite',
            animationDelay: '2s',
            boxShadow: '0 0 10px 2px hsl(var(--secondary))'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: '80%',
            top: '30%',
            animation: 'shootingStar 5s ease-in-out infinite',
            animationDelay: '4s',
            boxShadow: '0 0 10px 2px hsl(var(--primary))'
          }}
        />
      </div>

      {/* Nebula clouds - Space themed */}
      <div className="absolute inset-0 opacity-40">
        {/* Purple-blue nebula - top left */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full blur-[120px] will-change-transform"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(280 70% 50% / 0.3) 0%, hsl(260 60% 40% / 0.2) 30%, hsl(240 50% 30% / 0.1) 50%, transparent 70%)',
            left: '0%',
            top: '5%',
            transform: `translate3d(0, -${scrollY * 0.08}px, 0)`
          }}
        />
        
        {/* Pink-cyan nebula - top right */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[130px] will-change-transform"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(var(--secondary) / 0.35) 0%, hsl(340 60% 50% / 0.2) 30%, hsl(180 60% 50% / 0.15) 50%, transparent 70%)',
            right: '0%',
            top: '15%',
            transform: `translate3d(0, -${scrollY * 0.1}px, 0)`
          }}
        />
        
        {/* Deep purple nebula - middle */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] will-change-transform"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(280 70% 40% / 0.25) 30%, hsl(260 60% 30% / 0.15) 50%, transparent 70%)',
            left: '40%',
            top: '50%',
            transform: `translate3d(0, -${scrollY * 0.12}px, 0)`
          }}
        />
        
        {/* Teal-blue nebula - bottom left */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full blur-[110px] will-change-transform"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(190 80% 50% / 0.3) 0%, hsl(210 70% 45% / 0.2) 30%, hsl(230 60% 40% / 0.12) 50%, transparent 70%)',
            left: '10%',
            top: '80%',
            transform: `translate3d(0, -${scrollY * 0.09}px, 0)`
          }}
        />
        
        {/* Pink-magenta nebula - bottom right */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full blur-[115px] will-change-transform"
          style={{
            background: 'radial-gradient(circle, hsl(320 70% 50% / 0.32) 0%, hsl(300 65% 45% / 0.22) 30%, hsl(280 60% 40% / 0.14) 50%, transparent 70%)',
            right: '8%',
            top: '100%',
            transform: `translate3d(0, -${scrollY * 0.11}px, 0)`
          }}
        />
        
        {/* Cosmic dust layers */}
        <div 
          className="absolute w-[900px] h-[400px] blur-[80px] will-change-transform"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(270 60% 50% / 0.15) 20%, hsl(250 60% 50% / 0.2) 50%, hsl(230 60% 50% / 0.15) 80%, transparent 100%)',
            left: '15%',
            top: '35%',
            transform: `translate3d(0, -${scrollY * 0.07}px, 0) rotate(-12deg)`
          }}
        />
        
        <div 
          className="absolute w-[850px] h-[350px] blur-[70px] will-change-transform"
          style={{
            background: 'linear-gradient(110deg, transparent 0%, hsl(var(--primary) / 0.18) 25%, hsl(310 65% 50% / 0.22) 50%, hsl(190 60% 50% / 0.16) 75%, transparent 100%)',
            right: '10%',
            top: '65%',
            transform: `translate3d(0, -${scrollY * 0.13}px, 0) rotate(8deg)`
          }}
        />
      </div>
    </div>
  );
};

export default StarfieldBackground;
