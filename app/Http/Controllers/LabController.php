<?php

namespace App\Http\Controllers;

use App\Lab;
use Illuminate\Http\Request;

class LabController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Lab::all()], 200);
    }

    public function show(Lab $lab)
    {
        return $lab;
    }

    public function store(Request $request)
    {
        $lab = Lab::create($request->all());

        return response()->json($lab, 201);
    }

    public function update(Request $request, Lab $lab)
    {
        $lab->update($request->all());

        return response()->json($lab, 200);
    }

    public function delete(Lab $lab)
    {
        $lab->delete();

        return response()->json(null, 204);
    }
}
