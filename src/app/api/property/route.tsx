import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const propertyURL = searchParams.get("url");
  if (!propertyURL) {
    return NextResponse.json(
      {
        message: "No URL",
      },
      { status: 400 },
    );
  }

  const propertyUrlAsString = propertyURL.toString();

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(propertyUrlAsString);

    // there is a script tag that has a propety of window.PAGE_MODEL with all the data - get that
    const propertyData = await page.evaluate(() => {
      const scriptTags = document.querySelectorAll("script");
      const scriptTag = Array.from(scriptTags).find((scriptTag) =>
        scriptTag.innerHTML.includes("window.PAGE_MODEL"),
      );

      if (!scriptTag) return null;

      const scriptTagContent = scriptTag.innerHTML;
      return JSON.parse(
        scriptTagContent.substring(
          scriptTagContent.indexOf("{"),
          scriptTagContent.lastIndexOf("}") + 1,
        ),
      );
    });

    await browser.close();

    const {
      propertyData: {
        prices: { primaryPrice },
        address: { displayAddress },
        channel,
      },
    } = propertyData;

    if (channel !== "RES_LET") {
      console.log(primaryPrice, displayAddress);
      return NextResponse.json({
        message: "Not a rental property",
        property: propertyData,
      });
    }

    const property = {
      price: primaryPrice,
      address: displayAddress,
    };

    return NextResponse.json({ message: "Success", property });
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message || "Error",
        property: null,
      },
      { status: 500 },
    );
  }
}
