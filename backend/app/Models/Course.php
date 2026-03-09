<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $appends = ['course_small_image'];

    public function getCourseSmallImageAttribute()
    {
        if (empty($this->image)) {
            return '';
        }
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }
        return asset('uploads/course/' . $this->image);
    }

    public function chapters(){
        return $this->hasMany(Chapter::class)->orderBy('sort_order','ASC');
    }

    public function outcomes(){
        return $this->hasMany(Outcome::class)->orderBy('sort_order','ASC');
    }

    public function requirements(){
        return $this->hasMany(Requirement::class)->orderBy('sort_order','ASC');
    }

    public function level () {
        return $this->belongsTo(Level::class);
    }

    public function category () {
        return $this->belongsTo(Category::class);
    }

    public function language () {
        return $this->belongsTo(Language::class);
    }

}
