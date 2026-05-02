/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import getCroppedImg from '../lib/imageUtils';

interface ImageEditorProps {
  image: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
  aspect?: number;
}

export default function ImageEditor({ image, onSave, onCancel, aspect = 16 / 9 }: ImageEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      if (croppedImage) {
        onSave(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
      <div className="relative w-full max-w-4xl h-[80vh] bg-neutral-900 rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
          <h2 className="text-white font-serif tracking-widest uppercase text-sm">Image Editor</h2>
          <button onClick={onCancel} className="text-white/60 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Editor Area */}
        <div className="relative flex-1 bg-neutral-950">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          {croppedAreaPixels && (
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-sm pointer-events-none">
              <div className="text-[10px] text-white/40 tracking-widest font-bold uppercase mb-1">Target Resolution</div>
              <div className="text-xl font-serif text-white flex items-baseline gap-2">
                <span>{Math.round(croppedAreaPixels.width)}</span>
                <span className="text-sm text-white/40">×</span>
                <span>{Math.round(croppedAreaPixels.height)}</span>
                <span className="text-[10px] ml-2 text-brand-accent tracking-widest uppercase">px</span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-neutral-900 space-y-6 shrink-0 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Zoom Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] text-white/40 tracking-widest font-bold uppercase">
                <span>Zoom</span>
                <span>{zoom.toFixed(1)}x</span>
              </div>
              <div className="flex items-center gap-4">
                <ZoomOut size={16} className="text-white/40" />
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-white"
                />
                <ZoomIn size={16} className="text-white/40" />
              </div>
            </div>

            {/* Rotation Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] text-white/40 tracking-widest font-bold uppercase">
                <span>Rotation</span>
                <span>{rotation}°</span>
              </div>
              <div className="flex items-center gap-4">
                <RotateCw size={16} className="text-white/40" />
                <input
                  type="range"
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="flex-1 accent-white"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            <button
              onClick={onCancel}
              className="px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase border border-white/20 text-white/60 hover:bg-white/10 hover:text-white transition-all rounded-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-10 py-3 text-[10px] font-bold tracking-[0.3em] uppercase bg-white text-black hover:bg-brand-accent hover:text-white transition-all rounded-sm flex items-center gap-3"
            >
              <Check size={14} />
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
