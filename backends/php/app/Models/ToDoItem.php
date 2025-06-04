<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ToDoItem extends Model
{
    protected $table = 'todo_items';
    public $timestamps = false;
    protected $fillable = ['text'];
}
