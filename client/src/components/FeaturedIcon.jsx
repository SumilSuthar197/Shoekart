import React from "react";
const features = [
  {
    imgSrc:
      "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/70/null/external-quality-logistic-delivery-kiranshastry-lineal-kiranshastry.png",
    text: "100% ORIGINAL GUARANTEE",
  },
  {
    imgSrc: "https://img.icons8.com/ios/64/null/security-checked--v1.png",
    text: "100% SECURE PAYMENT",
  },
  {
    imgSrc:
      "https://img.icons8.com/external-konkapp-detailed-outline-konkapp/74/null/external-fast-delivery-logistic-and-delivery-konkapp-detailed-outline-konkapp.png",
    text: "DELIVERY WITHIN 48 HOURS",
  },
  {
    imgSrc:
      "https://img.icons8.com/external-victoruler-outline-victoruler/64/null/external-return-box-logistics-victoruler-outline-victoruler.png",
    text: "RETURN WITHIN 30 DAYS",
  },
];

const FeaturedIcon = () => {
  return (
    <section className="features">
      {features.map((feature, index) => (
        <div key={index} className="features-icon">
          <div>
            <img src={feature.imgSrc} />
          </div>
          <div>
            <h5>{feature.text}</h5>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturedIcon;
