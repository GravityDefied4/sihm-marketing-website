import { useOutletContext } from 'react-router-dom';
import type { SchoolOutletContext } from './SchoolLayout';
import PageHero from '../components/layout/PageHero';
import ContactSection from '../components/sections/ContactSection';
import AdmissionsSection from '../components/sections/AdmissionsSection';

export default function ContactPage() {
  const school = useOutletContext<SchoolOutletContext>();

  return (
    <>
      <PageHero
        school={school}
        title="Contact & Admissions"
        subtitle={`Reach out to ${school.school.name} for inquiries about programs, admissions, and more.`}
        breadcrumb="Contact"
      />
      <ContactSection school={school} />
      <AdmissionsSection school={school} />
    </>
  );
}
