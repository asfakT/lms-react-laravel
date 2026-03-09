<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use App\Models\Chapter;
use App\Models\Level;
use App\Models\Language;
use App\Models\Lesson;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class CourseController extends Controller
{
    //this method will return all course for a specific user
    public function index() {}

    // This method will store/save a course in database as a draft
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:5'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        //this will store course in db
        $course = new Course();
        $course->title = $request->title;
        $course->status = 0;
        $course->user_id = $request->user()->id;
        $course->save();

        return response()->json([
            'status' => 200,
            'data' => $course,
            'message' => 'Course has been created successfully.'
        ], 200);
    }

    public function show($id)
    {
        $course = Course::with('chapters', 'chapters.lessons')->find($id);

        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found.',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $course,
        ], 200);
    }

    //this method will return categories/levels/languages
    public function metaData()
    {
        $categories = Category::all();
        $levels = Level::all();
        $languages = Language::all();
        return response()->json(['status' => 200, 'categories' => $categories, 'levels' => $levels, 'languages' => $languages,], 200);
    }

    //this method will update course basic data
    public function update(Request $request)
    {
        $course = Course::find($request->id);

        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|min:5',
            'category' => 'required',
            'level' => 'required',
            'language' => 'required',
            'sell_price' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        //this will update course in db
        $course->title = $request->title;
        $course->category_id = $request->category;
        $course->level_id = $request->level;
        $course->language_id = $request->language;
        $course->price = $request->sell_price;
        $course->cross_price = $request->cross_price;
        $course->description = $request->description;
        $course->save();

        return response()->json([
            'status' => 200,
            'data' => $course,
            'message' => 'Course updated  successfully.'
        ], 200);
    }

    // public function saveCourseImage(Request $request, $id)
    // {
    //     $course = Course::find($id);

    //     if (!$course) {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'Course not found.'
    //         ], 404);
    //     }

    //     $validator = Validator::make($request->all(), [
    //         'image' => 'required|image|mimes:jpg,jpeg,png|max:2048'
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 400,
    //             'errors' => $validator->errors()
    //         ], 400);
    //     }

    //     if ($course->image != "") {
    //         if (File::exists(public_path('uploads/course/' . $course->image))) {
    //             File::delete(public_path('uploads/course/' . $course->image));
    //         }
    //         if (File::exists(public_path('uploads/course/small' . $course->image))) {
    //             File::delete(public_path('uploads/course/small' . $course->image));
    //         }
    //     }

    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $ext = $image->getClientOriginalExtension();

    //         $imageName = time() . '-' . $id . '.' . $ext;
    //         $image->move(public_path('uploads/course'), $imageName);

    //         //create small thumbnail
    //        // $manager = new ImageManager(Driver::class);
    //         $manager = new ImageManager(new Driver());
    //         //$img = $manager->read(public_path('uploads/course'), $imageName);
    //         $img = $manager->read(public_path('uploads/course/' . $imageName));


    //         // crop the best fitting 5:3 (600x360) ratio and resize to 600x360 pixel
    //         $img->cover(750, 450);

    //         $course->image = $imageName;
    //         $img->save(public_path('uploads/course/small/' . $imageName));
    //     }

    //     return response()->json([
    //         'status' => 200,
    //         'data' => $course,
    //         'message' => 'Image uploaded successfully.'
    //     ], 200);
    // }

    //this method upload course image
    public function saveCourseImage(Request $request, $id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        //STEP 1: delete old image if exists
        if (!empty($course->image)) {
            $oldImagePath = public_path('uploads/course/' . $course->image);

            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
        }

        //STEP 2: upload new image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $ext = $image->getClientOriginalExtension();

            $imageName = time() . '-' . $id . '.' . $ext;
            $image->move(public_path('uploads/course'), $imageName);

            // TEP 3: update DB with new image
            $course->image = $imageName;
            $course->save();
        }

        return response()->json([
            'status' => 200,
            'data' => $course,
            'message' => 'Course image updated successfully.'
        ], 200);
    }

    // this method will publish/unpublish course
    public function changeStatus($id, Request $request)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found.'
            ], 404);
        }

        $course->status = $request->status;
        $course->save();

        $message = ($course->status == 1) ? 'Course published successfully.' : 'Course unpublished successfully.';

        return response()->json([
            'status' => 200,
            'course' => $course,
            'message' => $message
        ], 200);
    }

    //delete course
    // public function destroy($id, Request $request)
    // {
    //     $course = Course::where('id', $id)->where('user_id', $request->user()->id)->first();

    //     if ($course == null) {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'Course not found.'
    //         ], 404);
    //     }

    //     $chapters = Chapter::where('course_id', $course->id)->get();

    //     if (!empty($chapters)) {
    //         foreach ($chapters as $chapter) {
    //             $lessons = Lesson::where('chapter_id', $chapter->id)->get();
    //             if (!empty($chapters)) {
    //                 foreach ($lessons as $lesson) {
    //                     //delete old image if exists
    //                     if (!empty($lesson->image)) {
    //                         $oldVideoPath = public_path('uploads/course/videos' . $lesson->video);

    //                         if (File::exists($oldVideoPath)) {
    //                             File::delete($oldVideoPath);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     //delete old image if exists course
    //     if (!empty($course->image)) {
    //         $oldImagePath = public_path('uploads/course/' . $course->image);

    //         if (File::exists($oldImagePath)) {
    //             File::delete($oldImagePath);
    //         }
    //     }

    //     $course->delete();

    //      return response()->json([
    //         'status' => 200,
    //         'message' => 'Course deleted successfully.'
    //     ], 200);
    // }
    
    public function destroy($id, Request $request)
    {
        $course = Course::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$course) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found.'
            ], 404);
        }

        $chapters = Chapter::where('course_id', $course->id)->get();

        foreach ($chapters as $chapter) {
            $lessons = Lesson::where('chapter_id', $chapter->id)->get();

            if ($lessons->isNotEmpty()) {
                foreach ($lessons as $lesson) {
                    if (!empty($lesson->video)) {
                        $oldVideoPath = public_path('uploads/course/videos/' . $lesson->video);
                        if (File::exists($oldVideoPath)) {
                            File::delete($oldVideoPath);
                        }
                    }
                }
            }
        }

        if (!empty($course->image)) {
            $oldImagePath = public_path('uploads/course/' . $course->image);
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
        }

        $course->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Course deleted successfully.'
        ], 200);
    }
}
