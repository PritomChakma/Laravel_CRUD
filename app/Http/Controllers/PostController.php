<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
     
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render("Create");  
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request)
{
    $validated = $request->validate([
        "name" => "required|string|max:255",
        "description" => "required|string",
        "image" => "nullable|mimes:jpeg,png,jpg|max:2048",
    ]);

    $post = new Post();
    $post->name = $validated["name"];
    $post->description = $validated["description"];

    if ($request->hasFile("image")) {
        $path = $request->file("image")->store("posts", "public");
        $post->image = $path;
    }

    $post->save();

    return redirect()->route("home")->with("success", "Your post has been created!");
}

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
        public function edit($id)
        {
            $post = Post::findOrFail($id);
            return Inertia::render("Edit",[
                "post" => $post
            ]);
        }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, $id)
{
    $validated = $request->validate([
        "name" => "required",
        "description" => "required",
       "image" => "nullable|image|mimes:jpeg,png,jpg,webp|max:2048",

    ]);

    $post = Post::findOrFail($id);

    $post->name = $validated["name"];
    $post->description = $validated["description"];

    // image upload (optional)
    if ($request->hasFile("image")) {
        $path = $request->file("image")->store("posts", "public");
        $post->image = $path;
    }

    $post->save();

    return redirect()->route("home")->with("success", "Post updated successfully!");
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route("home")->with("success", "Post deleted successfully!");
    }

}
