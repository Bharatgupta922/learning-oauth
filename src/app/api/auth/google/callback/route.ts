import { googleOAuthClient } from "@/lib/googleOauth"
import { lucia } from "@/lib/lucia"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { redirect } from "next/navigation"

// http://localhost:3000/api/auth/google/callback
export async function GET(request: NextRequest) {
    const url = request.nextUrl
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")

    if (!code || !state) {
        console.log("Invalid request: Missing code or state")
        return new Response("INVALID REQUEST", { status: 400 })
    }

    const codeVerifier = cookies().get('codeVerifier')?.value
    const savedState = cookies().get('state')?.value
    if (!codeVerifier || !savedState) {
        console.log("Invalid request: missing code verifier")
        return new Response("INVALID REQUEST", { status: 400 })
    }

    if (state !== savedState) {
        console.log("Invalid request: state mismatch")
        return new Response("INVALID REQUEST", { status: 400 })
    }

    const tokens = await googleOAuthClient.validateAuthorizationCode(code, codeVerifier)
    const accessToken = tokens.accessToken()
    if (!accessToken) {
        console.log("Failed to validate authorization code")
        return new Response("AUTHORIZATION FAILED", { status: 400 })
    }

    const googleResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    const googleData = (await googleResponse.json()) as {
        id: string,
        email: string,
        name: string,
        picture: string
    }

    let userId: string = '';

    // if we have the user sign them in 
    // if not create a new user & then set the cookie and then sign them in

    const existingUser = await prisma.user.findUnique({
        where: { email: googleData.email }
    })

    if (existingUser) {
        userId = existingUser.id;
    } else {
        console.log('>>>>>>>>>>>>>>>>>', googleData)
        const newUser = await prisma.user.create({
            data: {
                email: googleData.email,
                name: googleData.name,
                picture: googleData.picture,
            }
        })
        userId = newUser.id;
    }

    const session = await lucia.createSession(userId, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/dashboard')

}