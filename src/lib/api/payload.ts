import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Returns a cached Payload instance using the project config.
 * Use this in all server-side data fetching functions.
 */
export const getPayloadClient = () => getPayload({ config })
