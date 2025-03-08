export async function fetchTemplates(url: string) {
  const response = await fetch(url);
  const { templates, pageCount } = (await response.json()) as {
    templates: Template[];
    pageCount: number;
  };
  return { templates, pageCount };
}

export async function createTemplate(name: string, reqs: string[]) {
  return await fetch('api/templates', {
    method: 'POST',
    body: JSON.stringify({ name: name, reqs: reqs }),
    headers: { 'Content-Type': 'application/json' },
  });
}
