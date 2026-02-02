import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export const runtime = "nodejs" 

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    console.log("FILE RECEIVED:", file?.name)

    if (!file) {
      return NextResponse.json({ message: "No file" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "counsellors" }, (error, result) => {
          if (error) return reject(error)
          resolve(result)
        })
        .end(buffer)
    })

    return NextResponse.json({ url: upload.secure_url })
  } catch (err) {
    console.error("UPLOAD ERROR:", err)
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    )
  }
}
