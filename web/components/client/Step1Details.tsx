"use client";

import React from "react";
import RegularDetails from "./RegularDetails";
import EventDetails from "./EventDetails";

interface Step1DetailsProps {
  bookingType: string;
  depositPerPerson: number;
  eventTimeStart: number;
}

export default function Step1Details(props: Step1DetailsProps) {
  const { bookingType } = props;

  if (bookingType === "event") {
    return <EventDetails {...props} />;
  }

  return <RegularDetails {...props} />;
}
