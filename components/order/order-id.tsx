"use client";

import { Order } from "@/types/order.type";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { TooltipWrapper } from "../tooltip-wrapper";

export function OrderID({ order }: { order: Order }) {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async () => {
    setCopied(true);

    await window.navigator.clipboard.writeText(order.id);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <pre className="border border-border/30 bg-muted/20 text-muted-foreground rounded-md overflow-hidden">
      <span className="px-2">{order.id}</span>
      <TooltipWrapper content="Copy ID">
        <Button
          size={"sm"}
          onClick={copy}
          className="bg-primary text-primary-foreground rounded-none border-l opacity-80 hover:opacity-100"
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </TooltipWrapper>
    </pre>
  );
}
