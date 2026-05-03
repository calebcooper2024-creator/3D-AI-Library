export const STANDARD_SOURCE_NOTE_LABEL = 'Source note';
export const STANDARD_SOURCE_NOTE_TEXT =
  'Built from publicly available research. Presented as a proposed implementation pattern rather than an actual deployment claim.';

export interface SectionContent {
  id: string;
  bgColorLeft?: string;
  textColorLeft?: string;
  bgColorRight?: string;
  textColorRight?: string;
  leftTitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  fullWidthContent?: React.ReactNode;
}
