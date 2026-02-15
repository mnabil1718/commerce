import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getOrderByIdAsServiceRole, updateOrderAsServiceRole } from '@/service/order.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // verify signature
    // Formula: SHA512(order_id + status_code + gross_amount + ServerKey)
    const { order_id, status_code, gross_amount, signature_key, transaction_status, payment_type } = body;

    
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const hash = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex');

    if (hash !== signature_key) {
      return NextResponse.json({ message: 'Invalid Signature' }, { status: 403 });
    }

    let status = "waiting payment";
    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      status = "paid";
    } else if (transaction_status === 'deny' || transaction_status === 'cancel' || transaction_status === 'expire') {
      status = "failed";
    }

    const { data: order } = await getOrderByIdAsServiceRole(order_id);
    await updateOrderAsServiceRole({ ...order, status, payment_method: payment_type });
    return NextResponse.json({ status: 'ok' }, { status: 200 });

  } catch (error: unknown) {
    
    if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}