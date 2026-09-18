import React, { useState, useRef } from 'react';
import { sampleImageLibrary } from '../../data/initialData';
import { useSite } from '../../context/SiteContext';
import { Upload, Image as ImageIcon, Link, Check, Trash2, Copy, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  onRemove?: () => void;
}

// Client-side image compression & optimization helper
const optimizeImageForWeb = (
  file: File,
  maxDimension = 1920,
  quality = 0.84
): Promise<{ dataUrl: string; fileSizeDisplay: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            dataUrl: src,
            fileSizeDisplay: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
          });
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern WebP format for optimal compression and fidelity, fall back to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Calculate size display
        const approxBytes = Math.round((dataUrl.length * 3) / 4);
        const sizeDisplay =
          approxBytes > 1024 * 1024
            ? `${(approxBytes / (1024 * 1024)).toFixed(2)} MB`
            : `${Math.round(approxBytes / 1024)} KB`;

        resolve({ dataUrl, fileSizeDisplay: sizeDisplay });
      };
      img.onerror = () => reject(new Error('Failed to decode image file'));
      img.src = src;
    };
    reader.onerror = () => reject(new Error('Failed to read file from disk'));
    reader.readAsDataURL(file);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Image',
  onRemove
}) => {
  const { mediaItems, addMediaItem, showToast } = useSite();
  const [activeTab, setActiveTab] = useState<'upload' | 'preset' | 'media' | 'url'>('preset');
  const [urlInput, setUrlInput] = useState(value || '');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 16 * 1024 * 1024) {
      setUploadError('Image size exceeds 16MB. Please compress or choose a smaller image.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const { dataUrl, fileSizeDisplay } = await optimizeImageForWeb(file);
      onChange(dataUrl);
      setIsUploading(false);

      // Register in central media library as well
      await addMediaItem({
        url: dataUrl,
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: 'upload',
        fileSize: fileSizeDisplay
      });
      showToast('Image uploaded, optimized & applied to website!', 'success');
    } catch (err) {
      console.error('Image upload failed:', err);
      setUploadError('Failed to process image. Please try another image.');
      setIsUploading(false);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      addMediaItem({
        url: urlInput.trim(),
        title: 'Remote URL Asset',
        category: 'link'
      });
      showToast('Image URL applied.', 'success');
    }
  };

  const handleCopyUrl = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold">
          {label}
        </label>
        {value && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="text-[10px] text-[#7D7468] hover:text-[#1E1B18] flex items-center gap-1 font-medium"
            >
              <Copy className="w-3 h-3" /> {copied ? 'Copied' : 'Copy URL'}
            </button>
            <span className="text-[10px] text-[#9E7D53] font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> Image Selected
            </span>
          </div>
        )}
      </div>

      {/* Current Preview */}
      {value && (
        <div className="relative aspect-16/9 rounded-lg overflow-hidden border border-[#23201C]/15 bg-neutral-100 max-h-48 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <span className="text-white text-xs font-mono bg-black/60 px-3 py-1 rounded-md">
              Current Asset
            </span>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs flex items-center gap-1"
                title="Remove Image"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mode Tabs */}
      <div className="flex rounded-lg bg-[#EFECE6] p-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('preset')}
          className={`flex-1 py-1.5 rounded-md font-medium text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'preset' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#7D7468]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-1.5 rounded-md font-medium text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'upload' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#7D7468]'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-1.5 rounded-md font-medium text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'media' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#7D7468]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Library ({mediaItems.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex-1 py-1.5 rounded-md font-medium text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'url' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#7D7468]'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          <span>URL</span>
        </button>
      </div>

      {/* Preset Library View */}
      {activeTab === 'preset' && (
        <div className="space-y-2">
          <p className="text-[11px] text-[#7D7468]">
            Click any curated South Tyrol luxury photo to apply it instantly:
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 border border-[#23201C]/10 rounded-lg bg-white">
            {sampleImageLibrary.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(item.url)}
                className={`relative aspect-4/3 rounded overflow-hidden border-2 transition-all group text-left ${
                  value === item.url ? 'border-[#9E7D53] ring-2 ring-[#9E7D53]/30' : 'border-transparent hover:opacity-90'
                }`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[9px] text-white truncate">
                  {item.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Upload File View */}
      {activeTab === 'upload' && (
        <div className="space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#23201C]/20 hover:border-[#9E7D53] rounded-lg p-6 text-center cursor-pointer bg-white transition-colors"
          >
            {isUploading ? (
              <div className="space-y-2">
                <div className="w-6 h-6 border-2 border-[#9E7D53] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#1E1B18] font-medium">Processing & uploading image...</p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-[#9E7D53] mx-auto mb-2" />
                <p className="text-xs text-[#1E1B18] font-medium">
                  Click or drag photo from your device
                </p>
                <p className="text-[10px] text-[#7D7468] mt-1">
                  Supports JPG, PNG, WebP (high-res up to 8MB)
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {uploadError && (
            <p className="text-xs text-red-600">{uploadError}</p>
          )}
        </div>
      )}

      {/* Central Media Library View */}
      {activeTab === 'media' && (
        <div className="space-y-2">
          <p className="text-[11px] text-[#7D7468]">
            Select an image from the central media library:
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 border border-[#23201C]/10 rounded-lg bg-white">
            {mediaItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.url)}
                className={`relative aspect-4/3 rounded overflow-hidden border-2 transition-all group text-left ${
                  value === item.url ? 'border-[#9E7D53] ring-2 ring-[#9E7D53]/30' : 'border-transparent hover:opacity-90'
                }`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[9px] text-white truncate">
                  {item.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Direct URL View */}
      {activeTab === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs text-[#1E1B18] bg-white focus:outline-none focus:border-[#9E7D53]"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-4 py-2 bg-[#9E7D53] text-white text-xs uppercase tracking-wider rounded-lg hover:bg-[#8C6D44]"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
