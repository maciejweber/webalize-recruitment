import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '../i18n'

export const getPayloadClient = () => getPayload({ config })
