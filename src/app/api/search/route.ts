import { searchMulti } from "@/features/search/services/search.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q") || "";

    if (!query.trim()) {
      return NextResponse.json({
        results: [],
      });
    }

    const results = await searchMulti(query);

    return NextResponse.json({
      results,
    });
  } catch (error) {
    console.error("Search API Error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch search results",
      },
      {
        status: 500,
      },
    );
  }
}
