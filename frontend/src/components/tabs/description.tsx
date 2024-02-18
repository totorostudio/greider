type  DescriptionProps = {
  description: string;
}

export function Description({ description }: DescriptionProps): JSX.Element {
  return (
    <div className="tabs__content" id="description">
      <p className="tabs__product-description">{description}</p>
    </div>
  );
}
