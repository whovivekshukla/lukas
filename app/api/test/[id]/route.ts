import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }) => {
  return NextResponse.json({ msg: `Hello ${params.id}` });
};
