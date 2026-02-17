import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { AdminOrderWithRelation } from "@/types/order.type";
import { displayRupiah } from "@/utils/price";
import { constructFullAddress } from "@/utils/address";

interface EmailTemplateProps {
  order: AdminOrderWithRelation;
}

export function EmailTemplate({ order }: EmailTemplateProps) {
  const address = order.order_addresses?.[0];

  return (
    <Html lang="en">
      <Head />
      <Preview>
        Your order #{order.id} is being prepared — thanks for ordering with us!
      </Preview>
      <Tailwind>
        <Body className="bg-[#f5f0eb] font-sans">
          <Container className="mx-auto max-w-140 py-10">
            {/* Header */}
            <Section className="rounded-t-2xl bg-[#2c1a0e] px-8 py-6 text-center">
              <Text className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a97e]">
                Order Confirmed
              </Text>
              <Heading className="m-0 mt-1 text-3xl font-bold text-white">
                ☕ Your brew is on its way
              </Heading>
            </Section>

            {/* Body */}
            <Section className="rounded-b-2xl bg-white px-8 py-8 shadow-sm">
              {/* Greeting */}
              <Text className="mt-3 text-lg font-semibold text-[#2c1a0e]">
                Hey {order.order_user?.full_name ?? "there"}
              </Text>
              <Text className="mt-2 text-sm leading-relaxed text-[#6b5744]">
                Thanks for your order! Our barista is already crafting your
                drinks with care. Our driver will have everything at your door
                very shortly. Here&apos;s a summary of what&apos;s coming your
                way:
              </Text>

              <Hr className="my-6 border-[#f0e8e0]" />

              {/* Order Meta */}
              <Row>
                <Column className="w-1/2">
                  <Text className="m-0 text-xs font-semibold uppercase tracking-wider text-[#9e7f66]">
                    Order Number
                  </Text>
                  <Text className="m-0 mt-1 text-sm font-medium text-[#2c1a0e]">
                    #{order.order_number}
                  </Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-xs font-semibold uppercase tracking-wider text-[#9e7f66]">
                    Date
                  </Text>
                  <Text className="m-0 mt-1 text-sm font-medium text-[#2c1a0e]">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </Column>
              </Row>

              <Hr className="my-6 border-[#f0e8e0]" />

              {/* Order Items */}
              <Text className="m-0 text-xs font-semibold uppercase tracking-wider text-[#9e7f66]">
                Your Order
              </Text>

              {order.order_items.map((item) => (
                <Row key={item.id} className="mt-3">
                  <Column className="w-10">
                    <Text className="m-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f0eb] text-center text-sm font-bold text-[#2c1a0e]">
                      {item.quantity}x
                    </Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-sm font-medium text-[#2c1a0e]">
                      {item.title}
                    </Text>
                  </Column>
                  <Column className="text-right">
                    <Text className="m-0 text-sm font-semibold text-[#2c1a0e]">
                      {displayRupiah(item.price * item.quantity)}
                    </Text>
                  </Column>
                </Row>
              ))}

              <Hr className="my-6 border-[#f0e8e0]" />

              {/* Totals */}
              <Row>
                <Column>
                  <Text className="m-0 text-sm text-[#6b5744]">Subtotal</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-sm text-[#2c1a0e]">
                    {displayRupiah(order.total_amount)}
                  </Text>
                </Column>
              </Row>

              <Row className="mt-2">
                <Column>
                  <Text className="m-0 text-base font-bold text-[#2c1a0e]">
                    Total
                  </Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-base font-bold text-[#2c1a0e]">
                    {displayRupiah(order.total_amount)}
                  </Text>
                </Column>
              </Row>

              <Hr className="my-6 border-[#f0e8e0]" />

              {/* Delivery Address */}
              {address && (
                <>
                  <Text className="m-0 text-xs font-semibold uppercase tracking-wider text-[#9e7f66]">
                    Delivering To
                  </Text>
                  <Text className="mt-1 text-sm leading-relaxed text-[#2c1a0e]">
                    {address.full_name}, {address.phone} -{" "}
                    {constructFullAddress(address)}
                  </Text>
                  <Hr className="my-6 border-[#f0e8e0]" />
                </>
              )}

              {/* CTA */}
              <Section className="rounded-xl bg-[#fdf6ee] px-6 py-5 text-center">
                <Text className="m-0 text-sm text-[#6b5744]">
                  Sit back, relax, and let the caffeine come to you. ☕
                </Text>
                <Text className="m-0 mt-1 text-xs text-[#9e7f66]">
                  Questions about your order? Just reply to this email.
                </Text>
              </Section>
            </Section>

            {/* Footer */}
            <Text className="mt-6 text-center text-xs text-[#9e7f66]">
              You&apos;re receiving this because you placed an order with us.
              <br />© {new Date().getFullYear()} Matte, Inc. All rights
              reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
