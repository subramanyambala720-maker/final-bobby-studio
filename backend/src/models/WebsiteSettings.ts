import mongoose, { Schema, Document } from 'mongoose';

export interface IWebsiteSettings extends Document {
  siteName: string;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    whatsapp?: string;
  };
  heroSlides: {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    videoUrl?: string;
    ctaText: string;
    ctaLink: string;
    isPublished: boolean;
  }[];
  seoConfigs: {
    route: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  }[];
  updatedAt: Date;
}

const WebsiteSettingsSchema: Schema = new Schema(
  {
    siteName: { type: String, default: 'Bobby Studio' },
    logoUrl: { type: String, default: '/images/logo.png' },
    phone: { type: String, default: '+91 9949216881' },
    whatsapp: { type: String, default: '919949216881' },
    email: { type: String, default: 'subramanyambala720@gmail.com' },
    address: { type: String, default: 'Bobby Studio, Luxury Street, Jubilee Hills, Hyderabad, India' },
    mapEmbedUrl: { type: String, default: '' },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com/bobbyyyy.x_' },
      facebook: { type: String, default: 'https://facebook.com/bobbystudio' },
      youtube: { type: String, default: 'https://youtube.com/@bobbystudio' },
      whatsapp: { type: String, default: 'https://wa.me/919949216881' },
    },
    heroSlides: [
      {
        id: { type: String },
        title: { type: String },
        subtitle: { type: String },
        imageUrl: { type: String },
        videoUrl: { type: String },
        ctaText: { type: String },
        ctaLink: { type: String },
        isPublished: { type: Boolean, default: true },
      },
    ],
    seoConfigs: [
      {
        route: { type: String },
        metaTitle: { type: String },
        metaDescription: { type: String },
        keywords: [{ type: String }],
        ogImage: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IWebsiteSettings>('WebsiteSettings', WebsiteSettingsSchema);
