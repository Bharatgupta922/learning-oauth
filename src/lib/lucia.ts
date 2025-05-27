import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';
import { cookies } from 'next/headers';

const adapter = new PrismaAdapter(prisma.session, prisma.user)


export const lucia = new Lucia(adapter, {
    sessionCookie: {
        name: 'bharat-auth-cookie',
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production' ?  true : false
        }
    }
})

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
    if (!sessionId) {
        return null;
    }
    const { session, user }  = await lucia.validateSession(sessionId)
    try {
        if (session && session.fresh) {
            // refresh cookie 
            const sessionCookie = await lucia.createSessionCookie(session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        } 
        if (!session) {
            const sessionCookie = await lucia.createBlankSessionCookie()
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)        
        }
    } catch (error) {
    
    }
    const dbUser = await prisma.user.findUnique({
        select: {
            name: true,
            email: true
        },
        where: {
            id: user?.id
        }
    })
    return dbUser
}