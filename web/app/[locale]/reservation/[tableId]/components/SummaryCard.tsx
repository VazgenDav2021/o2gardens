"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function SummaryCard({ title, children }: Props) {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/5">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}
