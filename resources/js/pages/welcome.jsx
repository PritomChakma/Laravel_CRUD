import { Head, Link, router } from '@inertiajs/react';

export default function Welcome({ posts }) {
    const handleDelete = (id) => {
        if (!confirm('Delete?')) return;
        router.delete(`/posts/${id}`);
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gray-100 py-10">
                <div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-md">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <h1 className="text-2xl font-bold text-gray-700">Home</h1>

                        <Link href="/create" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                            + Add New User
                        </Link>
                    </div>

                    {/* Body */}
                    <div className="mt-6 text-gray-600">
                        <div className="overflow-x-auto rounded-lg border bg-white">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="px-4 py-3">ID</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Description</th>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {posts?.length ? (
                                        posts.map((post) => (
                                            <tr key={post.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">{post.id}</td>

                                                <td className="px-4 py-3 font-medium text-gray-800">{post.name}</td>

                                                <td className="px-4 py-3">
                                                    <p className="line-clamp-2 max-w-md">{post.description}</p>
                                                </td>
                                                <td className="px-4 py-2">
                                                    {post.image ? (
                                                        <img
                                                            src={`/storage/${post.image}`} 
                                                            alt={post.name}
                                                            className="h-12 w-12 rounded object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-400">No image</span>
                                                    )}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={`/posts/${post.id}/edit`}
                                                            className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(post.id)}
                                                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="px-4 py-6 text-center text-gray-500" colSpan="5">
                                                No posts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
