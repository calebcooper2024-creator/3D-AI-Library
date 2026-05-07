import type { ReactNode } from 'react';

export const STANDARD_SOURCE_NOTE_LABEL = 'Case Study Disclaimer';
export const STANDARD_SOURCE_NOTE_TEXT =
  'Built from publicly available research and framed as a proposed implementation pattern. Unless explicitly stated otherwise, this case study is not a claim that I deployed the system for the company named on the cover.';

type BaseSection = {
  id: string;
};

type SplitSectionTone = {
  bgColorLeft?: string;
  textColorLeft?: string;
  bgColorRight?: string;
  textColorRight?: string;
};

export type SectionMedia =
  | {
      type: 'image';
      src: string;
      alt?: string;
    }
  | {
      type: 'video';
      src: string;
      alt?: string;
    }
  | {
      type: 'custom';
      node: ReactNode;
    };

export type NarrativeSection = BaseSection & {
  eyebrow?: string;
  title: string;
  media?: SectionMedia;
} & (
    | {
        body: ReactNode;
      }
    | {
        content: ReactNode;
      }
  );

export type SplitSection = BaseSection &
  SplitSectionTone & {
    leftTitle?: string;
    rightTitle?: string;
  } & (
    | {
        leftContent: ReactNode;
        rightContent?: ReactNode;
      }
    | {
        leftContent?: ReactNode;
        rightContent: ReactNode;
      }
  );

export type FullWidthSection = BaseSection & {
  fullWidthContent: ReactNode;
};

export type SectionContent = NarrativeSection | SplitSection | FullWidthSection;
