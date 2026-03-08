import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'companyName', 'preferredDate', 'createdAt'],
    group: 'CRM',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'phoneCountryCode',
      type: 'text',
      admin: {
        description: 'E.164 country dial code, e.g. "+48"',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'preferredDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Preferred date for the call.',
      },
    },
    {
      name: 'preferredTime',
      type: 'select',
      options: [
        { label: '8:00 – 10:00', value: '08:00' },
        { label: '10:00 – 12:00', value: '10:00' },
        { label: '12:00 – 14:00', value: '12:00' },
        { label: '14:00 – 16:00', value: '14:00' },
        { label: '16:00 – 18:00', value: '16:00' },
      ],
      admin: {
        description: 'Preferred time slot for the call.',
      },
    },
    {
      name: 'privacyAccepted',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description: 'User has accepted the privacy policy.',
      },
    },
  ],
  timestamps: true,
}
