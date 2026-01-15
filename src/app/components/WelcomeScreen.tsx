interface WelcomeScreenProps {
  onMenu: () => void;
  onParentsTips?: () => void;
}

export function WelcomeScreen({ onMenu, onParentsTips }: WelcomeScreenProps) {
  return (
    <>
      <style>{`
        @keyframes pageFlip {
          0%, 100% {
            transform: perspective(1200px) rotateY(0deg);
          }
          50% {
            transform: perspective(1200px) rotateY(-15deg);
          }
        }
        
        @keyframes pageFlipRight {
          0%, 100% {
            transform: perspective(1200px) rotateY(0deg);
          }
          50% {
            transform: perspective(1200px) rotateY(15deg);
          }
        }
        
        @keyframes arrowBounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes arrowPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
        
        .arrow-animation {
          animation: arrowBounce 1.5s ease-in-out infinite, arrowPulse 1.5s ease-in-out infinite;
          display: inline-block;
        }
        
        .book-3d {
          position: relative;
          width: 240px;
          height: 180px;
          margin: 0 auto;
          transform-style: preserve-3d;
          perspective: 1200px;
        }
        
        .book-page {
          position: absolute;
          width: 120px;
          height: 180px;
          background: linear-gradient(to right, #ffffff 0%, #f8f8f8 100%);
          border: 2px solid #ddd;
          border-radius: 0 8px 8px 0;
          transform-origin: left center;
          transform-style: preserve-3d;
          box-shadow: 
            inset -5px 0 10px rgba(0,0,0,0.1),
            5px 5px 20px rgba(0,0,0,0.2);
        }
        
        .book-page-left {
          left: 0;
          background: linear-gradient(to left, #ffffff 0%, #f8f8f8 100%);
          border-radius: 8px 0 0 8px;
          transform-origin: right center;
          box-shadow: 
            inset 5px 0 10px rgba(0,0,0,0.1),
            -5px 5px 20px rgba(0,0,0,0.2);
        }
        
        .book-page-right {
          right: 0;
          animation: pageFlipRight 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .book-page-left {
          animation: pageFlip 3s ease-in-out infinite;
        }
        
        .book-spine {
          position: absolute;
          left: 50%;
          top: 0;
          width: 20px;
          height: 180px;
          background: linear-gradient(to bottom, #8B4513 0%, #654321 100%);
          transform: translateX(-50%) translateZ(10px);
          border-radius: 4px;
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          {/* Анимированная книга */}
          <div className="book-3d mb-12">
            <div className="book-page book-page-left">
              <div className="flex items-center justify-center h-full">
                <span className="text-6xl">📖</span>
              </div>
            </div>
            <div className="book-spine"></div>
            <div className="book-page book-page-right">
              <div className="flex items-center justify-center h-full">
                <span className="text-6xl">✨</span>
              </div>
            </div>
          </div>

          {/* Заголовок */}
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent leading-tight">
            Чи-та-ем по сло-гам
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-12 font-medium">
            Ве-сё-лое о-бу-че-ние чте-ни-ю для ма-лы-шей! 🎉
          </p>

          {/* Кнопки */}
          <div className="flex flex-col gap-6 items-center">
            <button
              onClick={onMenu}
              className="group relative bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-12 py-6 rounded-2xl text-3xl font-black shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">На-чать о-бу-че-ние!</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></span>
            </button>

            <div className="arrow-animation text-5xl">
              ⬇️
            </div>

            {onParentsTips && (
              <button
                onClick={onParentsTips}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-purple-200"
              >
                Советы для родителей 👨‍👩‍👧
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}