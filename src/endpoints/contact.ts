import type { Endpoint } from 'payload'
import { APIError } from 'payload'
import { z } from 'zod'
import type { ContactSubmission } from '../payload-types'

type PreferredTime = NonNullable<ContactSubmission['preferredTime']>

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'fullName must be at least 2 characters')
    .max(100, 'fullName must be at most 100 characters')
    .trim(),

  email: z
    .string()
    .email('email must be a valid email address')
    .max(254, 'email must be at most 254 characters')
    .trim(),

  companyName: z
    .string()
    .min(1, 'companyName is required')
    .max(200, 'companyName must be at most 200 characters')
    .trim(),

  phoneCountryCode: z
    .string()
    .regex(/^\+\d{1,4}$/, 'phoneCountryCode must be in format +XX or +XXX')
    .optional(),

  phoneNumber: z
    .string()
    .regex(/^[\d\s\-().]{5,20}$/, 'phoneNumber contains invalid characters')
    .optional(),

  preferredDate: z.string().date('preferredDate must be a valid ISO date (YYYY-MM-DD)').optional(),

  preferredTime: z
    .enum(['08:00', '10:00', '12:00', '14:00', '16:00'], {
      message: 'preferredTime must be one of: 08:00, 10:00, 12:00, 14:00, 16:00',
    })
    .optional(),

  privacyAccepted: z.literal(true, 'Privacy policy must be accepted'),
})

export const contactEndpoint: Endpoint = {
  path: '/contact',
  method: 'post',
  handler: async (req) => {
    let raw: unknown

    try {
      raw = await req.json?.()
      if (!raw) throw new Error('Empty body')
    } catch {
      throw new APIError('Invalid JSON body', 400)
    }

    const result = contactSchema.safeParse(raw)

    if (!result.success) {
      return Response.json(
        {
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 422 },
      )
    }

    const {
      fullName,
      email,
      companyName,
      phoneCountryCode,
      phoneNumber,
      preferredDate,
      preferredTime,
    } = result.data

    const submission = await req.payload.create({
      collection: 'contact-submissions',
      data: {
        fullName,
        email,
        companyName,
        phoneCountryCode,
        phoneNumber,
        preferredDate,
        preferredTime: preferredTime as PreferredTime | undefined,
        privacyAccepted: true,
      },
      overrideAccess: true,
    })

    return Response.json({ success: true, id: submission.id }, { status: 201 })
  },
}
