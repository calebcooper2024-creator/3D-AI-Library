import React from 'react';
import LibraryShelfPick from '../LibraryShelfPick';
import { projects } from '../../data/portfolio';
import { works } from '../../data/works';

interface ProjectNextPreviousProps {
  currentSlug: string;
  onNavigate: (id: string) => void;
}

const ProjectNextPrevious: React.FC<ProjectNextPreviousProps> = ({ currentSlug, onNavigate }) => {
  const currentWork = works.find((work) => work.slug === currentSlug);
  if (!currentWork) return null;

  const libraryBooks = [...projects, ...works].sort((a, b) => a.title.localeCompare(b.title));
  const currentIndex = libraryBooks.findIndex((book) => book.id === currentWork.id);
  if (currentIndex === -1 || libraryBooks.length === 0) return null;

  const nextWork = libraryBooks[(currentIndex + 1) % libraryBooks.length];

  return (
    <LibraryShelfPick book={nextWork} onNavigate={onNavigate} className="mt-5" />
  );
};

export default ProjectNextPrevious;
