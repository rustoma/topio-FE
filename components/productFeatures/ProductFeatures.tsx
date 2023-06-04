import React from "react";

import "./productFeatures.style.scss";

interface ProductFeaturesProps {
  features: string;
}

interface ProductFeature {
  name: string;
  value: string;
}
const parseFeatures = (features: string): ProductFeature[] => {
  try {
    return JSON.parse(features);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return [];
  }
};

export const ProductFeatures = ({ features }: ProductFeaturesProps) => {
  const parsedFeatures = parseFeatures(features);

  return (
    <>
      {parsedFeatures.map((feature) => (
        <div key={feature.name + feature.value} className="product-features">
          <ul className="product-features__list">
            <li className="product-features__list-item">
              <span className="product-features__feature-name">{feature.name}</span>
              {feature.value}
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};
