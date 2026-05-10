import { nextauthOptions } from '@/lib/next-auth-option'
import { getServerSession } from 'next-auth'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(nextauthOptions)
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = !process.env.NODE_ENV ? forwarded?.split(',')[0]?.trim() : '112.204.128.73'
    if (!session?.user.id) {
      return Response.json({ message: 'User ID is required' }, { status: 400 })
    }

    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

    const url =
      `https://live-api.cpx-research.com/api/get-surveys.php` +
      `?app_id=${process.env.CPX_ID}` +
      `&email=${session.user?.email}` +
      `&ext_user_id=${encodeURIComponent(session?.user.id)}` +
      `&subid_1=${encodeURIComponent(session?.user.id)}` +
      `&output_method=api` +
      `&ip_user=${ip}` +
      `&secure_hash=${process.env.CPX_SECURITY_HASH}` +
      `&ua=${encodeURIComponent(userAgent)}`

    console.log('This is url', url)
    const res = await fetch(url)

    if (!res.ok) {
      return Response.json({ message: 'Failed to fetch surveys' }, { status: res.status })
    }

    const data = await res.json()
    console.log('DATA MO', data)

    const filtered = data?.surveys || []

    return Response.json({
      status: 200,
      data: filtered,
    })
  } catch (error: any) {
    return Response.json(
      {
        status: 500,
        message: error.message,
      },
      { status: 500 },
    )
  }
}
