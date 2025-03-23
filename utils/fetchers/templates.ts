export async function fetchTemplates(url: string) {
  const response = await fetch(url);
  const { templates, pageCount } = (await response.json()) as {
    templates: Template[];
    pageCount: number;
  };

  if (!response.ok) {
    throw new Error('Unable to retrieve templates.');
  }

  return { templates, pageCount };
}

export async function createTemplate(
  name: string,
  reqs: string[],
): Promise<string> {
  const response = await fetch('/api/templates', {
    method: 'POST',
    body: JSON.stringify({ name: name, reqs: reqs }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Unable to create template.');
  }

  const { templateID } = await response.json();
  return templateID;
}

export async function deleteTemplate(templateId: string) {
  const response = await fetch(`/api/templates/${templateId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to delete template.');
  }
}
