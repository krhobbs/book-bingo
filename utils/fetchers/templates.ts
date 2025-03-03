export async function fetchTemplates(url: string) {
  const response = await fetch(url);
  const { templates, pageCount } = (await response.json()) as {
    templates: Template[];
    pageCount: number;
  };
  return { templates, pageCount };
}
