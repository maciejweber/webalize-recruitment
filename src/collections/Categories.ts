import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-safe identifier. Auto-populate or set manually.',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Blog / News', value: 'post' },
        { label: 'FAQ', value: 'faq' },
      ],
      admin: {
        description: 'Which section this category belongs to.',
      },
    },
  ],
}
