import { NextRequest, NextResponse } from 'next/server'

const SITE_PIN = '7492'
const COOKIE_NAME = 'anyos-auth'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { pin } = body

  if (pin === SITE_PIN) {
    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false, error: 'Incorrect PIN' }, { status: 401 })
}
