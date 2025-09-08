import React from 'react';

interface LoaderProps {
  text?: string;
  height?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  text = "Cargando datos...",
  height = "h-64"
}) => {
  return (
    <div className={`w-full ${height} flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200`}>
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
};

export default Loader;