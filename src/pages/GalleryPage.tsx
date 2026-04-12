import { useOutletContext } from 'react-router-dom';
import type { SchoolOutletContext } from './SchoolLayout';
import PageHero from '../components/layout/PageHero';
import GallerySection from '../components/sections/GallerySection';

export default function GalleryPage() {
  const school = useOutletContext<SchoolOutletContext>();

  return (
    <>
      <PageHero
        school={school}
        title="Gallery"
        subtitle={`A glimpse into academic life, achievements, and memorable moments at ${school.school.name}.`}
        breadcrumb="Gallery"
      />
      <GallerySection school={school} />
    </>
  );
}
