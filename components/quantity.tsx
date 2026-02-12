"use client";

import { useState } from "react";
import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";

export function Quantity() {
  const [q, setQ] = useState<number>(0);
  const inc = () => {
    setQ((prev) => prev + 1);
  };

  const dec = () => {
    if (q === 0) return;
    setQ((prev) => prev - 1);
  };

  return (
    <ButtonGroup className="rounded-full overflow-hidden">
      <Button onClick={dec} variant="outline" className="rounded-l-full">
        <Minus />
      </Button>
      <div className="min-w-14 px-3 border flex flex-col justify-center items-center">
        {q}
      </div>
      <Button onClick={inc} variant="outline" className="rounded-r-full">
        <Plus />
      </Button>
    </ButtonGroup>
  );
}
