import { UserController } from "@/modules/users/infrastructure/user-controller";
import { NextRequest, NextResponse } from "next/server";

const _userController = new UserController();

export async function GET(
  req: NextRequest,
  route: {
    params: Promise<{ id: string }> | { id: string };
  }
): Promise<NextResponse> {
  const { id } = await route.params;
  const response = await _userController.retrieveUserById(id);
  if ("error" in response) {
    return NextResponse.json(response, { status: response.status });
  }
  return NextResponse.json(response, { status: response.status });
}

export async function PUT(
  req: NextRequest,
  route: {
    params: Promise<{ id: string }> | { id: string };
    body: { email: string; password: string; phone: string };
  }
): Promise<NextResponse> {
  const { id } = await route.params;
  const {
    email,
    password,
    phone,
    status,
  } = await req.json();


  const response = await _userController.updateUser({
    id,
    email,
    password,
    phone,
    status,
  });
  if ("error" in response) {
    return NextResponse.json(response, { status: response.status });
  }
  return NextResponse.json(response, { status: response.status });
}

export async function DELETE(
  req: NextRequest,
  route: {
    params: Promise<{ id: string }> | { id: string };
  }
): Promise<NextResponse> {
  const { id } = await route.params;
  const response = await _userController.deleteUser(id);
  if ("error" in response) {
    return NextResponse.json(response, { status: 204 });
  }
  return NextResponse.json(response, { status: 500 });
}