import { NextRequest, NextResponse } from "next/server";
import { Oumla } from "@oumla/sdk";

export async function POST(req: NextRequest) {

  const body = await req.json();

  if (req.method === "POST") {
  console.log("hellllllllllllllllllllllooooooooooooooooooo", body);

    try {
      // const response = await fetch(
      //   "https://sandbox.oumla.com/api/v1/profiles",
      //   {
      //     method: "post",
      //     body: JSON.stringify(body),
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-api-key": `Bearer ${process.env.OUMLA_API_KEY} `,
      //     },
      //   }
      // );
      // const data = await response.json();
      // // res.status(200).json(data);

      // return new NextResponse(
      //   JSON.stringify({ data: data }),
      //   {
      //       status: 200
      //   }
      // )
      const client = new Oumla({
        apiKey: process.env.OUMLA_API_KEY!,
        // Additional options...
      });
      const profile =  await client.createProfile({
        type: "User",
        reference: body.reference,
      });

      // const allProfiles =  await client.getProfiles();
      
      console.log("PROFILE", profile);

      return new NextResponse(
        JSON.stringify({ data: profile }),
        {
            status: 200
        }
      )
    } catch (error) {
      console.error("Request failed:", error);
      // res.status(500).json({ error: "Failed to fetch data from Oumla" });
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch data from Oumla" }),
        {
            status: 500
        }
      )
    }
  } else {
    // Handle any requests which aren't POST
    // res.setHeader("Allow", ["POST"]);
    // res.status(405).end(`Method ${req.method} Not Allowed`);
    return new NextResponse(
      `Method ${req.method} Not Allowed`,
      {
        status: 405,
        headers: {
          Allow: "POST"
        }
      }
    );
  }
}
