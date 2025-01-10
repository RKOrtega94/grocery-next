import { UserController } from "@/modules/users/infrastructure/user-controller";
import { NextRequest, NextResponse } from "next/server";

const _userController = new UserController();

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email, password, phone } = await req.json();
  const response = await _userController.createUser(email, password, phone);
  if ("error" in response) {
    return NextResponse.json(response, { status: response.status });
  }
  return NextResponse.json(response, { status: response.status });
}

export async function GET(): Promise<NextResponse> {
  const response = await _userController.retrieveAllUsers();
  if ("error" in response) {
    return NextResponse.json(response, { status: response.status });
  }
  return NextResponse.json(response, { status: response.status });
}
