declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare module "*?raw";

declare module "badge-maker/lib/make-badge" {
  const makeBadge: (format: any) => string;
  export default makeBadge;
}
