import { prisma } from "@/lib/prisma";
import type { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const wh = new Webhook(SIGNING_SECRET);

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing Svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return new Response("Error: Verification error", {
        status: 400,
      });
    }

    const eventType = evt.type;

    const { id: clerkUserId } = evt.data;

    if (!clerkUserId)
      return NextResponse.json(
        { error: "No user ID provided" },
        { status: 400 }
      );

    let user = null;

    switch (eventType) {
      case "user.created": {
        const data = evt.data as UserJSON;

        const email = data.email_addresses[0].email_address;

        user = await prisma.user.upsert({
          where: {
            clerkUserId,
          },
          update: {
            clerkUserId,
          },
          create: {
            clerkUserId,
            email,
          },
        });
        break;
      }
      case "user.deleted": {
        user = await prisma.user.delete({
          where: {
            clerkUserId,
          },
        });
        break;
      }
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
