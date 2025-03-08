import sql from '../db';

/**
 * Gets a page (10) of templates plus the total number of pages
 */
export async function getTemplates(page = 1) {
  const offsetValue = (page - 1) * 10;
  const templates = await sql<Template[]>`
    SELECT templates.id AS "_id", users.username AS "user", users.id AS "user_id", templates.name, jsonb_agg(template_reqs.req) AS reqs
    FROM ((bingo.templates INNER JOIN bingo.users ON templates.user_id = users.id)
      INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id)
    GROUP BY users.username, users.id, templates.name, templates.id
    ORDER BY templates.created_at DESC
    LIMIT 10
    OFFSET ${offsetValue}`;

  const templateCount = await sql`
    SELECT count(*) FROM bingo.templates`;

  const pageCount = Math.ceil(templateCount[0].count / 10);

  return { templates: templates, pageCount };
}

/**
 * Inserts a template record in the database
 */
export async function insertTemplate(
  name: string,
  userId: string,
  reqs: string[],
): Promise<string> {
  const insertTemplate = await sql`
    INSERT INTO bingo.templates(id, user_id, name, created_at) VALUES
    (gen_random_uuid(), ${userId}, ${name}, NOW())
    RETURNING id`;

  const { id: template_id } = insertTemplate[0];
  const values: { id: number; template_id: string; req: string }[] = [];
  for (let i = 0; i < 25; i++) {
    values.push({ id: i, template_id: template_id, req: reqs[i] });
  }

  await sql`
    INSERT INTO bingo.template_reqs ${sql(values)}
  `;

  return template_id;
}

/**
 * Deletes a template record and the corresponding template_reqs records
 */
export async function deleteTemplate(templateId: string) {
  await sql`
    DELETE FROM bingo.template_reqs WHERE template_id = ${templateId}`;

  await sql`
    DELETE FROM bingo.templates WHERE id = ${templateId}`;
}

/**
 * Gets a single template
 * @param templateId
 * @returns
 */
export async function getTemplateById(templateId: string) {
  const templateResult = await sql<Template[]>`
    SELECT 
      templates.id AS "id",
      json_build_object('id', user.id, 'name', users.username),
      templates.name,
      jsonb_agg(template_reqs.req) AS reqs
    FROM ((bingo.templates INNER JOIN bingo.users ON templates.user_id = users.id)
      INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id)
    WHERE templates.id = ${templateId}
    GROUP BY users.username, templates.name, templates.id`;

  return templateResult[0];
}
