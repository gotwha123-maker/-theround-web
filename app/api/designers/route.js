import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'public/data/designers.json');

// Helper to read local data
const getLocalData = () => {
  try {
    if (fs.existsSync(DATA_PATH)) {
      return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    }
  } catch (e) {
    console.error("Local Designers DB read error:", e);
  }
  return [];
};

// Helper to write local data
const saveLocalData = (data) => {
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error("Local Designers DB write error:", e);
    return false;
  }
};

export async function GET() {
  const cacheHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  };
  return NextResponse.json(getLocalData(), { headers: cacheHeaders });
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, isHidden, order } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const designers = getLocalData();
    const index = designers.findIndex(d => d.id === id);

    if (index !== -1) {
      if (isHidden !== undefined) designers[index].isHidden = isHidden;
      // You can add more fields here if the admin UI supports them
      saveLocalData(designers);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Designer not found" }, { status: 404 });
  } catch (err) {
    console.error("Local PATCH error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    let designers = getLocalData();
    const initialLength = designers.length;
    designers = designers.filter(d => d.id !== id);

    if (designers.length < initialLength) {
      saveLocalData(designers);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Designer not found" }, { status: 404 });
  } catch (err) {
    console.error("Local DELETE error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
