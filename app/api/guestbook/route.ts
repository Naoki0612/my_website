import { NextResponse } from "next/server";
import { getPostgresPool } from "@/lib/postgres";

export const runtime = "nodejs";

const limits = {
  nickname: 40,
  contact: 120,
  message: 1000
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nickname = clean(body.nickname);
    const contact = clean(body.contact);
    const message = clean(body.message);

    if (!nickname || !contact || !message) {
      return NextResponse.json({ error: "请填写昵称、联系方式和留言。" }, { status: 400 });
    }

    if (nickname.length > limits.nickname || contact.length > limits.contact || message.length > limits.message) {
      return NextResponse.json({ error: "输入内容太长，请稍微精简一下。" }, { status: 400 });
    }

    const pool = getPostgresPool();
    await pool.query(
      `insert into public.guestbook_messages (nickname, contact, message)
       values ($1, $2, $3)`,
      [nickname, contact, message]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Guestbook submission failed", error);
    return NextResponse.json({ error: "留言暂时没有保存成功，请稍后再试。" }, { status: 500 });
  }
}
