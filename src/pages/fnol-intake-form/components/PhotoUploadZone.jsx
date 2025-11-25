import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoUploadZone = ({ photos, onPhotosChange, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    const remainingSlots = 2 - photos?.length;
    const filesToAdd = imageFiles?.slice(0, remainingSlots);

    const newPhotos = filesToAdd?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file?.name,
      size: file?.size,
      uploading: true
    }));

    onPhotosChange([...photos, ...newPhotos]);

    setTimeout(() => {
      onPhotosChange(prev => prev?.map(photo => 
        newPhotos?.find(np => np?.id === photo?.id) 
          ? { ...photo, uploading: false }
          : photo
      ));
    }, 1500);
  };

  const removePhoto = (photoId) => {
    const photoToRemove = photos?.find(p => p?.id === photoId);
    if (photoToRemove && photoToRemove?.preview) {
      URL.revokeObjectURL(photoToRemove?.preview);
    }
    onPhotosChange(photos?.filter(p => p?.id !== photoId));
  };

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          Damage Photos <span className="text-error">*</span>
        </label>
        <span className="text-xs text-muted-foreground">
          {photos?.length}/2 uploaded
        </span>
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : error 
            ? 'border-error bg-error/5' :'border-border bg-card hover:border-primary/50'
          }
          ${photos?.length >= 2 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onClick={photos?.length < 2 ? triggerFileInput : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
          disabled={photos?.length >= 2}
        />

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon 
              name={isDragging ? "Download" : "Upload"} 
              size={24} 
              color="var(--color-primary)" 
              strokeWidth={2}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              {photos?.length >= 2 
                ? 'Maximum photos uploaded' 
                : isDragging 
                ? 'Drop photos here' :'Drag & drop damage photos or click to browse'
              }
            </p>
            <p className="text-xs text-muted-foreground">
              Upload up to 2 photos (JPG, PNG, max 10MB each)
            </p>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-sm text-error flex items-center gap-2">
          <Icon name="AlertCircle" size={16} strokeWidth={2} />
          {error}
        </p>
      )}
      {photos?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos?.map((photo) => (
            <div
              key={photo?.id}
              className="relative bg-card border border-border rounded-lg p-3 transition-smooth hover:shadow-elevated"
            >
              <div className="aspect-video rounded-md overflow-hidden bg-muted mb-3">
                <Image
                  src={photo?.preview}
                  alt={`Vehicle damage photo showing ${photo?.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {photo?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(photo?.size / 1024 / 1024)?.toFixed(2)} MB
                  </p>
                </div>

                {photo?.uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-muted-foreground">Uploading...</span>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePhoto(photo?.id)}
                    className="flex-shrink-0"
                    aria-label={`Remove ${photo?.name}`}
                  >
                    <Icon name="X" size={18} strokeWidth={2} />
                  </Button>
                )}
              </div>

              {photo?.uploading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUploadZone;