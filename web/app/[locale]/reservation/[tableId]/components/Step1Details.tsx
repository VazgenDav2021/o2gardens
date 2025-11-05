"use client";

import React from "react";
import RegularDetails from "./RegularDetails";
import EventDetails from "./EventDetails";

interface Props {
  bookingType: string;
  depositPerPerson: number;
  eventTimeStart: string | null;
}

export default function Step1Details(props: Props) {
  const { bookingType } = props;

  if (bookingType === "event") {
    return <EventDetails {...props} />;
  }

  return <RegularDetails {...props} />;
}
