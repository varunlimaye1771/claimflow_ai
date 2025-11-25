import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const DamagePhotoViewer = ({ photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const selectedPhoto = photos?.[selectedPhotoIndex];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Camera" size={20} color="var(--color-primary)" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-foreground">Damage Photos</h3>
        </div>
        <button
          onClick={() => setShowAnnotations(!showAnnotations)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 transition-smooth text-sm font-medium text-foreground"
          aria-label={showAnnotations ? "Hide annotations" : "Show annotations"}
        >
          <Icon name={showAnnotations ? "EyeOff" : "Eye"} size={16} strokeWidth={2} />
          <span>{showAnnotations ? "Hide" : "Show"} Annotations</span>
        </button>
      </div>
      <div className="relative bg-muted/30">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={selectedPhoto?.image}
            alt={selectedPhoto?.imageAlt}
            className="w-full h-full object-contain"
          />
          {showAnnotations && (
            <div className="absolute inset-0 pointer-events-none">
              {selectedPhoto?.annotations?.map((annotation, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${annotation?.x}%`,
                    top: `${annotation?.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-error animate-pulse-subtle" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-error text-error-foreground px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shadow-elevated">
                      {annotation?.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {photos?.length > 1 && (
          <>
            <button
              onClick={() => setSelectedPhotoIndex(prev => (prev > 0 ? prev - 1 : photos?.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 hover:bg-background border border-border flex items-center justify-center transition-smooth shadow-elevated"
              aria-label="Previous photo"
            >
              <Icon name="ChevronLeft" size={20} strokeWidth={2} />
            </button>
            <button
              onClick={() => setSelectedPhotoIndex(prev => (prev < photos?.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 hover:bg-background border border-border flex items-center justify-center transition-smooth shadow-elevated"
              aria-label="Next photo"
            >
              <Icon name="ChevronRight" size={20} strokeWidth={2} />
            </button>
          </>
        )}
      </div>
      {photos?.length > 1 && (
        <div className="p-4 flex gap-2 overflow-x-auto">
          {photos?.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`
                flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-smooth
                ${index === selectedPhotoIndex ? 'border-primary' : 'border-border hover:border-primary/50'}
              `}
              aria-label={`View photo ${index + 1}`}
            >
              <Image
                src={photo?.image}
                alt={photo?.imageAlt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} strokeWidth={2} />
          <span>Photo {selectedPhotoIndex + 1} of {photos?.length} • {selectedPhoto?.annotations?.length} issues detected</span>
        </div>
      </div>
    </div>
  );
};

export default DamagePhotoViewer;