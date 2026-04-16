import React from 'react';

interface WaveDividerProps {
  bottomColor: string;
  className?: string;
  isRTL?: boolean;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ 
  bottomColor, 
  className = "", 
  isRTL = false 
}) => {
  return (
    <div 
      className={`relative w-full overflow-visible z-20 h-[20px] md:h-[40px] ${className}`} 
      style={{ pointerEvents: 'none' }}
    >
      <div className="absolute inset-0 flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className={`w-full h-[60px] md:h-[100px] absolute bottom-[-1px] left-0 ${isRTL ? 'scale-x-[-1]' : ''}`}
          preserveAspectRatio="none"
        >
          {/* Main Wave Body */}
          <path 
            d="M0,160 C240,210,480,110,720,160 C960,210,1200,110,1440,160 V320 H0 Z" 
            fill={bottomColor}
          />
          
          {/* Secondary subtle wave for depth */}
          <path 
            d="M0,160 C360,210,720,110,1080,160 C1440,210,1800,110,2160,160 V320 H0 Z" 
            fill={bottomColor}
            fillOpacity="0.2"
          />
        </svg>
      </div>

      {/* Finishing gradient to ensure no hard lines */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ 
          background: `linear-gradient(to bottom, transparent, ${bottomColor})` 
        }}
      ></div>
    </div>
  );
};

export default WaveDivider;
