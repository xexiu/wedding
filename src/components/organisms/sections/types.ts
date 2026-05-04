"use client";

import { Locale } from "@/config/locales";
import { ModulePropsMap } from "@/config/modules";
import { WeddingDetails } from "@/config/wedding-details";
import { CadencePreset } from "@/themes/cadence";
import { TemplateStyles } from "@/themes/templates";

export type HeroCarouselSectionProps = {
  details: WeddingDetails;
  props: ModulePropsMap["heroCarousel"];
  locale: Locale;
  cadencePreset: CadencePreset;
  theme: TemplateStyles;
};

export type CountdownSectionProps = {
  details: WeddingDetails;
  props: ModulePropsMap["countdown"];
  locale: Locale;
  cadencePreset: CadencePreset;
  theme: TemplateStyles;
};

export type OurSongSectionProps = {
  props: ModulePropsMap["ourSong"];
  locale: Locale;
  theme: TemplateStyles;
};

export type PoemSectionProps = {
  props: ModulePropsMap["poem"];
  locale: Locale;
  theme: TemplateStyles;
};

export type EnvelopeSectionProps = {
  details: WeddingDetails;
  props: ModulePropsMap["envelope"];
  locale: Locale;
  theme: TemplateStyles;
};

export type DressCodeSectionProps = {
  props: ModulePropsMap["dressCode"];
  locale: Locale;
  theme: TemplateStyles;
};

export type GiftsSectionProps = {
  props: ModulePropsMap["gifts"];
  locale: Locale;
  theme: TemplateStyles;
};

export type StorySectionProps = {
  props: ModulePropsMap["ourStory"];
  locale: Locale;
  theme: TemplateStyles;
};

export type ScheduleSectionProps = {
  details: WeddingDetails;
  props: ModulePropsMap["schedule"];
  locale: Locale;
  cadencePreset: CadencePreset;
  theme: TemplateStyles;
};

export type PhotoMosaicSectionProps = {
  props: ModulePropsMap["photoMosaic"];
  locale: Locale;
  theme: TemplateStyles;
};

export type FaqSectionProps = {
  props: ModulePropsMap["faq"];
  locale: Locale;
  theme: TemplateStyles;
};

export type RsvpSectionProps = {
  details: WeddingDetails;
  props: ModulePropsMap["rsvp"];
  locale: Locale;
  cadencePreset: CadencePreset;
  theme: TemplateStyles;
};
