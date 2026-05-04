"use client";

import { LocaleCode } from "@/components/admin-modules/types";
import { WeddingDetails } from "@/config/wedding-details";
import { Dispatch, SetStateAction } from "react";

export type WeddingDetailsEditorProps = {
  localeForProps: LocaleCode;
  weddingDetails: WeddingDetails;
  setWeddingDetails: Dispatch<SetStateAction<WeddingDetails>>;
};
