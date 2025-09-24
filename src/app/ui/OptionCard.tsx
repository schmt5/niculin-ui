import { memo, useState } from "react";

function OptionCardComponent({ option }: { option }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-ni-200 border border-stone-300 rounded-md overflow-hidden">
      {/* Image */}
      <div className="relative h-44 bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={option.option_picture_link}
          alt={option.option_name}
          className={`w-full h-full object-cover rounded-t-md ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">
          {option.option_name}
        </h3>

        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
          {option.option_summary}
        </p>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">{option.cost}</p>
          <p className="text-xs text-gray-700">{option.cost_unit}</p>
        </div>
      </div>
    </div>
  );
}

export const OptionCard = memo(OptionCardComponent);
