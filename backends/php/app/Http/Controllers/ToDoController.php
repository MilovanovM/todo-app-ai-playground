<?php

namespace App\Http\Controllers;

use App\Models\ToDoItem;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;

class ToDoController extends Controller
{
    use ValidatesRequests;

    public function index()
    {
        return response()->json(ToDoItem::all());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'text' => 'required|string',
        ]);
        $item = ToDoItem::create(['text' => $request->input('text')]);
        return response()->json($item, 201);
    }

    public function destroy($id)
    {
        $item = ToDoItem::find($id);
        if (!$item) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $item->delete();
        return response()->json(null, 204);
    }
}
