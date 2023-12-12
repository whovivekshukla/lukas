import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
  return NextResponse.json({ msg: "Create Mission" });
};
