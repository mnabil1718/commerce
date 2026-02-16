"use client";

import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

export type QuantityProps = {
  init: number;
  max?: number;
  changeCallback?: (q: number) => void;
};

export function Quantity({ init, max = 10, changeCallback }: QuantityProps) {
  const q = init;

  const inc = () => {
    if (changeCallback) changeCallback(q + 1);
  };

  const dec = () => {
    if (q === 0) return;

    if (changeCallback) changeCallback(q - 1);
  };

  return (
    <ButtonGroup className="rounded-full overflow-hidden">
      <Button
        onClick={dec}
        disabled={q <= 1}
        variant="outline"
        className="rounded-l-full"
      >
        <Minus />
      </Button>
      <div className="min-w-14 px-3 border flex flex-col justify-center items-center">
        {q}
      </div>
      <Button
        onClick={inc}
        disabled={q === max}
        variant="outline"
        className="rounded-r-full"
      >
        <Plus />
      </Button>
    </ButtonGroup>
  );
}
