export type HomePageType = {
  id: number;
  SEO: MetaTag;
  banner_button: string;
  banner_description: string;
  banner_image: ImageType;
  banner_section_description_1: string;
  banner_section_description_2: string;
  banner_section_description_3: string;
  banner_section_title_1: string;
  banner_section_title_2: string;
  banner_section_title_3: string;
  banner_text: string;
  section_1_description: string;
  section_1_title: string;
  section_2_body: string;
  section_2_image: ImageType;
  section_2_title: string;
  section_3_body: string;
  section_3_button: string;
  section_3_button_url: string;
  section_3_title: string;
  promotion_ads: ImageType[];
} & TimeStampType;

export type LayoutContentType = {
  navbar: NavbarType;
  services: ServiceLinkType[];
  footer: FooterType;
  socials: SocialType[];
};

export type NavbarType = {
  id: number;
  logo: ImageType;
  website_name: string;
  home: string;
  service: string;
  about_us: string;
  contact_us: string;
} & TimeStampType;

export type FooterType = {
  company_address: string;
  company_email: string;
  company_info: string;
  company_name: string;
  company_phone_number: string;
  copyright: string;
} & TimeStampType;

export type SocialType = {
  id: number;
  name: string;
  platform: string;
  url: string;
  image: ImageType;
};

export type ServiceCard = {
  id: number;
  name: string;
  description: string;
  slug: string;
};

export type PackageType = {
  package_type: Array<any>;
};

export type ServicePageType = {
  title: string;
  body: any;
  SEO: MetaTag;
} & ServiceCard &
  PackageType &
  TimeStampType;

export type MetaTag = {
  title: string;
  description: string;
};

export type ServiceLinkType = {
  id: number;
  name: string;
  slug: string;
};

export type ImageType = {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  ext: string;
  formats: {
    thumbnail: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    small: { url: string; width: number; height: number };
  };
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any; // Replace 'any' with the actual type if known
  size: number;
  updatedAt: string;
  url: string;
  width: number;
};

export type TimeStampType = {
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
};
