import sql from '../db';

// inserts a template record into the templates table and 25 req records into the template_reqs table
export async function insertTemplate(
  name: string,
  user_id: string,
  reqs: string[],
) {
  const insertTemplate = await sql`
    INSERT INTO bingo.templates(id, user_id, name, created_at) VALUES
    (gen_random_uuid(), ${user_id}, ${name}, NOW())
    returning id`;

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

// deletes a template record and its corresponding template_reqs records
export async function deleteTemplate(template_id: string) {
  await sql`
    DELETE FROM bingo.template_reqs WHERE template_id = ${template_id}`;

  await sql`
    DELETE FROM bingo.templates WHERE id = ${template_id}`;
}

// gets template by id
export async function getTemplateById(template_id: string) {
  const templateResult = await sql`
    SELECT templates.id AS "_id", users.username AS "user", templates.name, jsonb_agg(template_reqs.req) AS reqs
    FROM ((bingo.templates INNER JOIN bingo.users ON templates.user_id = users.id)
      INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id)
    WHERE templates.id = ${template_id}
    GROUP BY users.username, templates.name, templates.id`;

  return templateResult[0];
}

// gets all templates
export async function getAllTemplates(page = 1) {
  const offsetValue = (page - 1) * 10;
  const templates = await sql`
    SELECT templates.id AS "_id", users.username AS "user", templates.name, jsonb_agg(template_reqs.req) AS reqs
    FROM ((bingo.templates INNER JOIN bingo.users ON templates.user_id = users.id)
      INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id)
    GROUP BY users.username, templates.name, templates.id
    ORDER BY templates.created_at DESC
    LIMIT 10
    OFFSET ${offsetValue}`;

  const templateCount = await sql`
    SELECT count(*) FROM bingo.templates`;

  const pageCount = Math.ceil(templateCount[0].count / 10);

  return [templates, pageCount];
}
