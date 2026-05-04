/**
 * DEVELOPER-ONLY: fills the DB with fake guests so you can preview the admin
 * “Users / Guests” UI (groups, acompañantes, songs, notes, etc.).
 *
 * This file is NOT used when a real guest opens your site from WhatsApp and
 * submits the public RSVP form. That path goes through `/api/rsvp` only.
 *
 * Why “remove” first? When you run `pnpm db:seed` again, we delete rows that
 * are clearly our dummy data (*@dummy.com or seed phones +155501…) so you do
 * not get 13, then 26, then 39 duplicate test guests. Real RSVPs use normal
 * emails and phone numbers, so they are not matched and stay untouched.
 *
 * Run: pnpm db:seed  (or: pnpm exec prisma db seed)
 */
import type { GuestGroup, RsvpStatus } from "../src/config/rsvp-enums";
import { randomUUID } from "node:crypto";
import { prisma } from "../src/lib/prisma";

const DUMMY_EMAIL_DOMAIN = "@dummy.com";
const SEED_PHONE_PREFIX = "+155501";

function seedPhone(n: number): string {
  return `${SEED_PHONE_PREFIX}${String(100000 + n).slice(1)}`;
}

type SeedGuest = {
  name: string;
  email: string | null;
  phone: string;
  group: GuestGroup;
  rsvpStatus: RsvpStatus;
  dietaryRestrictions: string | null;
  notes: string | null;
  plusOneNames: string[];
  requestedSongs: string[];
};

function plusOneCount(names: string[]): number {
  return names.length;
}

const seedGuests: SeedGuest[] = [
  // Baseline: attending, email + phone, no companions / songs / dietary / notes (like minimal form submit)
  {
    name: "Dummy Minimal",
    email: `minimal${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(1),
    group: "FAMILY",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: null,
    notes: null,
    plusOneNames: [],
    requestedSongs: []
  },
  // Optional email omitted (phone required)
  {
    name: "Dummy Sin Email",
    email: null,
    phone: seedPhone(2),
    group: "WORK",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: null,
    notes: null,
    plusOneNames: ["Lucía Fernández"],
    requestedSongs: ["Rosario — La flor más bella"]
  },
  // Single acompañante, single canción
  {
    name: "Dummy Pareja",
    email: `pareja${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(3),
    group: "FRIENDS",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: "Una comida sin frutos secos",
    notes: "Llegamos un poco tarde por el tren.",
    plusOneNames: ["Carlos Ruiz"],
    requestedSongs: ["Celia Cruz — La vida es un carnaval"]
  },
  // Varios acompañantes (nombres separados como en el formulario)
  {
    name: "Dummy Familia",
    email: `familia${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(4),
    group: "FAMILY",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: "Infantil: sin picante; adultos sin restricción",
    notes: "Mesa con niños si es posible, gracias.",
    plusOneNames: ["Ana Martín", "Diego Martín", "Sofía Martín"],
    requestedSongs: [
      "Marc Anthony — Vivir mi vida",
      "Juan Luis Guerra — La bilirrubina",
      "Héctor Lavoe — Mi gente"
    ]
  },
  // Muchas canciones, sin acompañantes
  {
    name: "Dummy Canciones",
    email: `canciones${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(5),
    group: "FRIENDS",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: null,
    notes: "¡Gracias por organizarlo todo!",
    plusOneNames: [],
    requestedSongs: [
      "Los Ángeles Azules — Nunca es suficiente",
      "Bad Bunny — Tití me preguntó",
      "Shakira — Hips Don't Lie",
      "Queen — Don't Stop Me Now",
      "ABBA — Dancing Queen"
    ]
  },
  // Solo restricciones dietéticas
  {
    name: "Dummy Dietética",
    email: `dietetica${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(6),
    group: "WORK",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: "Vegano estricto; sin miel ni gelatina",
    notes: null,
    plusOneNames: [],
    requestedSongs: []
  },
  // Solo notas largas
  {
    name: "Dummy Notas Largas",
    email: `notas${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(7),
    group: "OTHER",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: null,
    notes:
      "Confirmación de asistencia: os escribo para deciros que con mucha ilusión " +
      "asistiremos a la boda. Si necesitáis ayuda con el seating o con desplazamientos " +
      "desde el hotel, decídnoslo. Un abrazo enorme y enhorabuena otra vez.",
    plusOneNames: [],
    requestedSongs: []
  },
  // Declinado con mensaje
  {
    name: "Dummy No Puede",
    email: `declina${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(8),
    group: "FRIENDS",
    rsvpStatus: "DECLINED",
    dietaryRestrictions: null,
    notes: "No podemos asistir por viaje de trabajo ese fin de semana. ¡Muchísimas felicidades!",
    plusOneNames: [],
    requestedSongs: []
  },
  // Pendiente (aún no confirma)
  {
    name: "Dummy Pendiente",
    email: `pendiente${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(9),
    group: "FAMILY",
    rsvpStatus: "PENDING",
    dietaryRestrictions: null,
    notes: null,
    plusOneNames: [],
    requestedSongs: []
  },
  // Declinado mínimo
  {
    name: "Dummy Declina Simple",
    email: `declina2${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(10),
    group: "WORK",
    rsvpStatus: "DECLINED",
    dietaryRestrictions: null,
    notes: null,
    plusOneNames: [],
    requestedSongs: []
  },
  // Acompañante + varias canciones + todo rellenado
  {
    name: "Dummy Combo Completo",
    email: `combo${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(11),
    group: "FRIENDS",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: "Sin gluten; con alternativa vegetariana si hay menú fijo",
    notes: "Confirmamos asistencia para dos. Preferimos mesa tranquila si cabe.",
    plusOneNames: ["Elena Vidal"],
    requestedSongs: ["Daft Punk — Get Lucky", "Bruno Mars — 24K Magic"]
  },
  // Grupo OTHER + asistencia con dos acompañantes y una canción
  {
    name: "Dummy Invitación Plus",
    email: `plus${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(12),
    group: "OTHER",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: "Alérgica a mariscos",
    notes: null,
    plusOneNames: ["Paula N.", "Miguel T."],
    requestedSongs: ["Bee Gees — Stayin' Alive"]
  },
  // Email con formato típico x@dummy.com (pedido explícito)
  {
    name: "Dummy X Placeholder",
    email: `x${DUMMY_EMAIL_DOMAIN}`,
    phone: seedPhone(13),
    group: "OTHER",
    rsvpStatus: "ATTENDING",
    dietaryRestrictions: null,
    notes: "Fila de prueba con email x@dummy.com",
    plusOneNames: ["Acompañante X"],
    requestedSongs: ["Frank Sinatra — Fly Me to the Moon"]
  }
];

async function removePreviousSeedGuests(): Promise<void> {
  const deleted = await prisma.guest.deleteMany({
    where: {
      OR: [{ email: { endsWith: DUMMY_EMAIL_DOMAIN } }, { phone: { startsWith: SEED_PHONE_PREFIX } }]
    }
  });
  console.info(`Removed ${deleted.count} previous seed guest(s).`);
}

async function main(): Promise<void> {
  await removePreviousSeedGuests();

  for (const guest of seedGuests) {
    const plusNames = guest.plusOneNames;
    const songs = guest.requestedSongs;
    await prisma.guest.create({
      data: {
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        group: guest.group,
        rsvpStatus: guest.rsvpStatus,
        dietaryRestrictions: guest.dietaryRestrictions,
        notes: guest.notes,
        plusOneCount: plusOneCount(plusNames),
        plusOneNames: plusNames,
        requestedSongs: songs,
        invitation: {
          create: {
            token: randomUUID()
          }
        }
      }
    });
  }

  console.info(`Created ${seedGuests.length} seed guest(s).`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
