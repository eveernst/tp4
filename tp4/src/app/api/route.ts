import { connect } from '@/app/libs/mongodb'
import counter from '@/app/models/Counter';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  await connect();
  const value = new counter({count: 0});
  await value.save();
  return NextResponse.json({ status: 201 });
}

export async function GET() {
  await connect();
  const instance = await counter.findOne({});
  return NextResponse.json({ count: instance ? instance.count : 0 }, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const { newCount: count } = await request.json();
  await connect();
  const updatedCounter = await counter.findOneAndUpdate({}, { $set: { count } }, { new: true, upsert: true });
  return NextResponse.json({ count: updatedCounter.count }, { status: 200 });
}
