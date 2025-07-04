import PropertyCard from "@/components/propertyCard";
import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import "@/models/Property";

const SavedPropertiesPage = async () => {
  await connectDB();
  const { userId } = await getSessionUser();

  const { bookmark } = await User.findById(userId).populate("bookmark");
  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmark.length === 0 ? (
          <p>No saved bookmarks!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmark.map((property) => {
              return <PropertyCard key={property._id} property={property} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
