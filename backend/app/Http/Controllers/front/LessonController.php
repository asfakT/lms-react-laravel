<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Lesson;
use Illuminate\Support\Facades\File;
use App\Models\Chapter;

class LessonController extends Controller
{
    //This method will store/save a Lesson
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'chapter' => 'required',
            'lesson' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $lesson = new Lesson();
        $lesson->chapter_id = $request->chapter;
        $lesson->title = $request->lesson;
        $lesson->sort_order = 1000;
        $lesson->status = $request->status;
        $lesson->save();

        $chapter = Chapter::with('lessons')
        ->where('id', $request->chapter)
        ->first();

        return response()->json([
            'status' => 200,
            'chapter' => $chapter,
            'message' => 'Lesson added successfully.'
        ], 200);
    }

    //this method will fetch lesson data
    public function show($id)
    {
        $lesson = Lesson::find($id);

        if ($lesson == null) {
            return response()->json([
                'status' => 400,
                'message' => 'Lesson not found.'
            ], 400);
        }

        return response()->json([
            'status' => 200,
            'data' => $lesson,
        ], 200);
    }


    //This method will update a Lesson
    public function update(Request $request, $id)
    {
        $lesson = Lesson::find($id);

        if ($lesson == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Lesson not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'chapter_id' => 'required',
            'lesson' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $lesson->chapter_id = $request->chapter_id;
        $lesson->title = $request->lesson;
        $lesson->is_free_preview = ($request->free_preview == false) ? 'no' : 'yes';
        $lesson->duration = $request->duration;
        $lesson->description = $request->description;
        $lesson->status = $request->status;
        $lesson->save();

        return response()->json([
            'status' => 200,
            'data' => $lesson,
            'message' => 'Lesson updated successfully.'
        ], 200);
    }

    //this method will delete a Lessons
    public function destroy($id)
    {
        $lesson = Lesson::find($id);

        if ($lesson == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Lesson not found.'
            ], 404);
        }

        $chapterId = $lesson->chapter_id;

        $lesson->delete();

        $chapter = Chapter::where('id', $chapterId)
            ->with('lessons')
            ->first();


        return response()->json([
            'status' => 200,
            'chapter' => $chapter,
            'message' => 'Lesson deleted successfully.'
        ], 200);
    }

    //upload lesson video
    public function saveVideo(Request $request, $id)
    {
        $lesson = Lesson::find($id);

        if (!$lesson) {
            return response()->json([
                'status' => 404,
                'message' => 'lesson not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'video' => 'required|mimes:mp4'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        //STEP 1: delete old video if exists
        // if (!empty($lesson->video)) {
        //     $oldvideoPath = public_path('uploads/course/videos/' . $lesson->video);

        //     if (File::exists($oldvideoPath)) {
        //         File::delete($oldvideoPath);
        //     }
        // }

        $videoDir = public_path('uploads/course/videos');

        // delete old
        if ($lesson->video && File::exists($videoDir . '/' . $lesson->video)) {
            File::delete($videoDir . '/' . $lesson->video);
        }

        //STEP 2: upload new video
        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $ext = $video->getClientOriginalExtension();

            $videoName = time() . '-' . $id . '.' . $ext;
            $video->move(public_path('uploads/course/videos'), $videoName);

            // TEP 3: update DB with new video
            $lesson->video = $videoName;
            $lesson->save();
        }
        $lesson->refresh();
        return response()->json([
            'status' => 200,
            'data' => $lesson,
            'message' => 'Lesson video updated successfully.'
        ], 200);
    }

    //sort Lessons
    public function sortLessons (Request $request){
        $chapterId = '';
        if(!empty($request->lessons)) {
            foreach($request->lessons as $key => $lesson) {
                $chapterId = $lesson['chapter_id'];
                Lesson::where('id',$lesson['id'])->update(['sort_order'=> $key]);
            }
        }

        $chapter = Chapter::where('id', $chapterId)
            ->with('lessons')
            ->first();

        return response()->json([
            'status' => 200,
            'chapter' => $chapter,
            'message' => 'lessons updated successfully.'
        ], 200);
    }
}
