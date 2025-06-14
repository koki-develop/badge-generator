import Image from "next/image";
import React, { memo } from "react";
import * as Scroll from "react-scroll";

export type ServiceCardProps = {
  name: string;
  imgSrc: string;
};

const ServiceCard: React.FC<ServiceCardProps> = memo((props) => {
  const { name, imgSrc } = props;
  return (
    <Scroll.Link
      to={name}
      smooth
      duration={300}
      className="flex cursor-pointer flex-col items-center justify-center rounded-sm border border-gray-200 py-4 hover:bg-gray-50 active:bg-gray-100"
    >
      <Image width={80} height={80} src={imgSrc} alt="" />
      <span>{name}</span>
    </Scroll.Link>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
