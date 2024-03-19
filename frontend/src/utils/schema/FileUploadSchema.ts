import * as z from 'zod';

export const FileUploadSchema = z.object({
  name: z.string().min(1),
  type: z.string().refine(type => {
    return type === 'text/plain' || type === 'text/markdown';
  }, { message: 'File must be a text file or markdown file' })
});
