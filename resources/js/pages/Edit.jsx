import { Head, Link, useForm } from "@inertiajs/react";

const Edit = ({ post }) => {
  const { data, setData, post: submitPost, processing, errors } = useForm({
    name: post.name || "",
    description: post.description || "",
    image: null,
  });

  const submit = (e) => {
    e.preventDefault();
    submitPost(`/posts/${post.id}?_method=put`, {
      forceFormData: true, 
    });
  };

  return (
    <>
      <Head title="Edit Post" />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-700">Edit The Value</h1>

            <Link
              href="/"
              className="rounded-md bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600"
            >
              ← Back to Home
            </Link>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-5">
            {/* Name */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={data.name} // ✅ data থেকে value
                onChange={(e) => setData("name", e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="Enter post name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">Description</label>
              <textarea
                value={data.description} // ✅ data থেকে value
                onChange={(e) => setData("description", e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                rows="4"
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Current Image Preview (optional) */}
            {post.image && (
              <div>
                <label className="mb-1 block font-medium text-gray-700">Current Image</label>
                <img
                  src={`/storage/${post.image}`}
                  alt="Current"
                  className="h-20 w-20 rounded border object-cover"
                />
              </div>
            )}

            {/* Image */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">New Image</label>
              <input
                type="file"
                onChange={(e) => setData("image", e.target.files[0])}
                className="w-full rounded-md border px-3 py-2"
              />
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={processing}
                className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {processing ? "Saving..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
