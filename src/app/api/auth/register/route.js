import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json({ user: null, message: "User with this username already exists. Please Login!" }, { status: 409 });
    }

    if (username.length < 3) {
      return NextResponse.json({ user: null, message: "Username must contain at least 3 characters." }, { status: 422 });    
    }

    if (password.length < 6) {
      return NextResponse.json({ user: null, message: "Password must contain at least 6 characters." }, { status: 422 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ message: 'Successfully Registered!' }, { status: 201 });
  } catch (e) {
    // console.error(e); // Log the error for debugging purposes
    return NextResponse.json({ message: 'Something went wrong on our end.' }, { status: 500 });
  }
}
