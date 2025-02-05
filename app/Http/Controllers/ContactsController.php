<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    // Get all Contactss
    public function index()
    {
        return response()->json(Contacts::all(), 200);
    }

    // Store a new Contacts
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:Contacts,email',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string',
        ]);

        $Contacts = Contacts::create($request->all());

        return response()->json($Contacts, 201);
    }

    // Show a specific Contacts
    public function show($id)
    {
        $Contacts = Contacts::find($id);

        if (!$Contacts) {
            return response()->json(['message' => 'Contacts not found'], 404);
        }

        return response()->json($Contacts, 200);
    }

    // Update a Contacts
    public function update(Request $request, $id)
    {
        $Contacts = Contacts::find($id);

        if (!$Contacts) {
            return response()->json(['message' => 'Contacts not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:Contactss,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'message' => 'nullable|string',
        ]);

        $Contacts->update($request->all());

        return response()->json($Contacts, 200);
    }

    // Delete a Contacts
    public function destroy($id)
    {
        $Contacts = Contacts::find($id);

        if (!$Contacts) {
            return response()->json(['message' => 'Contacts not found'], 404);
        }

        $Contacts->delete();

        return response()->json(['message' => 'Contacts deleted'], 200);
    }
}

