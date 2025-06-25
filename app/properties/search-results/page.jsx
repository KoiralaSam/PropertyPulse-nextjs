"use server";
import Link from "next/link";
import PropertyCard from "@/components/propertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import ConvertToSerializableObject from "@/utils/convertToObjects";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const location = params?.location;
  const propertyType = params?.propertyType;

  await connectDB();

  const locationPattern = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertyQueryResults = await Property.find(query).lean();

  const properties = ConvertToSerializableObject(propertyQueryResults);

  console.log(properties);
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-7-7xl mx-auto px-4 flex flex-col items-start sm:px-6">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-center text-bloue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No Search Results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gaps-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
