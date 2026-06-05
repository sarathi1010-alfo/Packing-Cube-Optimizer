import airlinesData from "@/content/airlines.json";
import cubesData from "@/content/cubes.json";
import templatesData from "@/content/templates.json";
import { Airline, Cube, Template } from "./schema";

export const getAirlines = (): Airline[] => {
  return airlinesData as Airline[];
};

export const getAirlineById = (id: string): Airline | undefined => {
  return (airlinesData as Airline[]).find((airline) => airline.id === id);
};

export const getCubes = (): Cube[] => {
  return cubesData as Cube[];
};

export const getCubeById = (id: string): Cube | undefined => {
  return (cubesData as Cube[]).find((cube) => cube.id === id);
};

export const getTemplates = (): Template[] => {
  return templatesData as Template[];
};

export const getTemplateBySlug = (slug: string): Template | undefined => {
  return (templatesData as Template[]).find((template) => template.slug === slug);
};
