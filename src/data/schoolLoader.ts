/**
 * schoolLoader.ts
 *
 * Assembles SchoolData from the per-section YAML files in src/data/schoolData/.
 *
 * Each YAML file owns one section's content. To adapt this site for a
 * different school, edit the content inside those files — no code changes needed.
 */

import yaml from 'js-yaml';
import type { SchoolData, SectionVariants } from '../types/school';

import schoolYaml       from './schoolData/school.yaml?raw';
import heroYaml         from './schoolData/hero.yaml?raw';
import aboutYaml        from './schoolData/about.yaml?raw';
import academicsYaml    from './schoolData/academics.yaml?raw';
import facultyYaml      from './schoolData/faculty.yaml?raw';
import partnersYaml     from './schoolData/partners.yaml?raw';
import testimonialsYaml from './schoolData/testimonials.yaml?raw';
import newsYaml         from './schoolData/news.yaml?raw';
import galleryYaml      from './schoolData/gallery.yaml?raw';
import admissionsYaml   from './schoolData/admissions.yaml?raw';
import contactYaml      from './schoolData/contact.yaml?raw';

// ---- parsed shapes (intentionally loose — YAML is user-edited) ----
interface SchoolFile {
  university: SchoolData['university'];
  school: SchoolData['school'];
  socialMedia: SchoolData['socialMedia'];
  highlights: SchoolData['highlights'];
}
interface HeroFile {
  variant?: SectionVariants['hero'];
  heroImage?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}
interface AboutFile {
  dean: SchoolData['dean'];
  about: SchoolData['about'];
}
interface AcademicsFile {
  programsVariant?: SectionVariants['programs'];
  programs: SchoolData['programs'];
  academics: SchoolData['academics'];
}
interface FacultyFile {
  variant?: SectionVariants['faculty'];
  faculty: SchoolData['faculty'];
}
interface PartnersFile {
  variant?: SectionVariants['partners'];
  partners: SchoolData['partners'];
}
interface TestimonialsFile {
  variant?: SectionVariants['testimonials'];
  testimonials: SchoolData['testimonials'];
}
interface NewsFile {
  variant?: SectionVariants['news'];
  news: SchoolData['news'];
}
interface GalleryFile {
  variant?: SectionVariants['gallery'];
  gallery: SchoolData['gallery'];
  events: SchoolData['events'];
}
interface AdmissionsFile {
  admissions: SchoolData['admissions'];
}
interface ContactFile {
  contact: SchoolData['contact'];
  accreditations: SchoolData['accreditations'];
}

function parse<T>(raw: string): T {
  return yaml.load(raw) as T;
}

export function loadSchool(): SchoolData {
  const school       = parse<SchoolFile>(schoolYaml);
  const hero         = parse<HeroFile>(heroYaml);
  const about        = parse<AboutFile>(aboutYaml);
  const academics    = parse<AcademicsFile>(academicsYaml);
  const faculty      = parse<FacultyFile>(facultyYaml);
  const partners     = parse<PartnersFile>(partnersYaml);
  const testimonials = parse<TestimonialsFile>(testimonialsYaml);
  const news         = parse<NewsFile>(newsYaml);
  const gallery      = parse<GalleryFile>(galleryYaml);
  const admissions   = parse<AdmissionsFile>(admissionsYaml);
  const contact      = parse<ContactFile>(contactYaml);

  return {
    university: school.university,
    school: {
      ...school.school,
      heroImage: hero.heroImage || '',
      heroCta: {
        primary: hero.ctaPrimary,
        secondary: hero.ctaSecondary,
      },
    },
    dean: about.dean,
    about: about.about,
    academics: academics.academics,
    programs: academics.programs,
    highlights: school.highlights,
    faculty: faculty.faculty,
    partners: partners.partners,
    testimonials: testimonials.testimonials,
    news: news.news,
    accreditations: contact.accreditations,
    admissions: admissions.admissions,
    contact: contact.contact,
    gallery: gallery.gallery,
    events: gallery.events,
    socialMedia: school.socialMedia,
    sectionVariants: {
      hero: hero.variant,
      faculty: faculty.variant,
      testimonials: testimonials.variant,
      programs: academics.programsVariant,
      gallery: gallery.variant,
      news: news.variant,
      partners: partners.variant,
    },
  };
}
