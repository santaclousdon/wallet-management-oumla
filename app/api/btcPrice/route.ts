// pages/api/btcPrice.js
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
  // Check for GET request
  if (req.method === 'GET') {
    console.log('called btcPrice api')
    try {
      const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC', {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY!,
          'Content-Type': 'application/json'
        }
      });

      console.log("response => ", response)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const btcPriceInUSD = data.data.BTC.quote.USD.price.toFixed(2);

      return new NextResponse(
        JSON.stringify({ btcPrice: btcPriceInUSD }),
        {
            status: 200
        }
      )
    } catch (error) {
      console.error('Failed to fetch BTC rate:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch data' }),
        {
            status: 500
        }
      )
    }
  } else {
    // Handle any requests that aren't GET
    // res.setHeader('Allow', ['GET']);
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
