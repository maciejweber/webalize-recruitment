import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async'

interface RichTextProps {
  data: Record<string, unknown> | null | undefined
}

export async function RichText({ data }: RichTextProps) {
  if (!data) return null

  const html = await convertLexicalToHTMLAsync({
    data,
  })

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
