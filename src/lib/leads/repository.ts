import "server-only";

import postgres, { type Sql } from "postgres";

export type LeadValues = {
  form: "quick" | "contact" | "waitlist";
  name: string | null;
  contact: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  product: string | null;
  stage: string | null;
  message: string;
  monthlyVolume: string | null;
  currentHandler: string | null;
  page: string | null;
  userAgent: string | null;
};

let database: Sql | undefined;

const isProductionBuild = (): boolean => process.env.NEXT_PHASE === "phase-production-build";

const getDatabase = (): Sql | null => {
  if (isProductionBuild()) return null;

  const databaseUrl = process.env.LUFE_DATABASE_URL;
  if (!databaseUrl) return null;

  if (!database) {
    database = postgres(databaseUrl, {
      prepare: false,
      max: 3,
      ssl: process.env.LUFE_DATABASE_SSL === "disable" ? false : "require",
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }

  return database;
};

export const createLead = async (values: LeadValues): Promise<string | null> => {
  const sql = getDatabase();
  if (!sql) return null;

  const rows = await sql<{ id: string }[]>`
    INSERT INTO lufe.leads (
      form, name, contact, email, phone, company, product, stage, message, monthly_volume,
      current_handler, page, user_agent
    ) VALUES (
      ${values.form}, ${values.name}, ${values.contact}, ${values.email}, ${values.phone},
      ${values.company}, ${values.product}, ${values.stage}, ${values.message}, ${values.monthlyVolume},
      ${values.currentHandler}, ${values.page}, ${values.userAgent}
    )
    RETURNING id
  `;

  return rows[0]?.id ?? null;
};

export const updateLeadNotification = async (
  id: string,
  notified: boolean,
  notifyError: string | null,
): Promise<void> => {
  const sql = getDatabase();
  if (!sql) throw new Error("LUFE_DATABASE_URL is not configured");

  await sql`
    UPDATE lufe.leads
    SET notified = ${notified}, notify_error = ${notifyError}
    WHERE id = ${id}
  `;
};
