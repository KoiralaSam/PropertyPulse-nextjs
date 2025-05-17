const PropertyPage = async ({ params, searchParams }) => {
  const { id } = await params;

  return <div>Property Page {id}</div>;
};

export default PropertyPage;
