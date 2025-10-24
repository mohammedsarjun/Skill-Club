import { useState } from 'react';
import {
  FaTimes,
  FaExternalLinkAlt,
  FaGithub,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
} from 'react-icons/fa';

import { IPortfolio } from '@/types/interfaces/IFreelancer'; 
interface PortfolioModalProps {
  portfolio: IPortfolio;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void; // optional delete handler
}

export default function PortfolioModal({ portfolio, isOpen, onClose, onDelete }: PortfolioModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % portfolio.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + portfolio.images.length) % portfolio.images.length);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{portfolio.title}</h2>
          <div className="flex gap-2">
            {onDelete && (
              <button
                onClick={() => onDelete(portfolio.id)}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
                aria-label="Delete portfolio"
              >
                <FaTrash className="w-6 h-6 text-red-600" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {portfolio.video && (
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
              {!isVideoPlaying ? (
                <div className="relative w-full h-full">
                  <img
                    src={portfolio.images[0] || '/placeholder.jpg'}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all group"
                  >
                    <div className="bg-[#108A00] rounded-full p-6 group-hover:scale-110 transition-transform shadow-lg">
                      <FaPlay className="w-12 h-12 text-white fill-current" />
                    </div>
                  </button>
                </div>
              ) : (
                <video
                  src={portfolio.video}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}

          {portfolio.images && portfolio.images.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Project Images</h3>
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={portfolio.images[currentImageIndex]}
                  alt={`${portfolio.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-[400px] object-contain"
                />
                {portfolio.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#108A00] hover:bg-[#0d6e00] text-white p-3 rounded-full shadow-lg transition-all"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#108A00] hover:bg-[#0d6e00] text-white p-3 rounded-full shadow-lg transition-all"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm">
                      {currentImageIndex + 1} / {portfolio.images.length}
                    </div>
                  </>
                )}
              </div>
              {portfolio.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {portfolio.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-[#108A00] scale-105'
                          : 'border-gray-300 hover:border-[#108A00] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Role</h3>
              <p className="text-gray-700 bg-[#108A00] bg-opacity-10 px-4 py-2 rounded-lg inline-block">
                {portfolio.role}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{portfolio.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-[#108A00] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#0d6e00] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {portfolio.projectUrl && (
                <a
                  href={portfolio.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#108A00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d6e00] transition-all hover:scale-105 shadow-md"
                >
                  <FaExternalLinkAlt className="w-5 h-5" />
                  View Live Project
                </a>
              )}
              {portfolio.githubUrl && (
                <a
                  href={portfolio.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-all hover:scale-105 shadow-md"
                >
                  <FaGithub className="w-5 h-5" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
