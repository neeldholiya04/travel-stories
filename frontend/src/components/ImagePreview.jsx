import { useState, useEffect } from 'react';

export default function ImagePreview({ file }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!preview) return null;

  return (
    <div className="mt-2">
      <img
        src={preview}
        alt="Preview"
        className="max-h-48 rounded-lg object-cover"
      />
    </div>
  );
}