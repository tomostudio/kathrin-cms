export default {
    name: 'settings',
    title: 'Settings',
    type: 'document',
    initialValue: () => ({
      webTitle: "Kathrin Honesta"
    }),
    fields: [
        {
          name: 'webTitle',
          title: 'Website Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          title: "SEO",
          name: "seo",
          type: "object",
          options: {
            collapsible: true
          },
          fields: [
            {
              name: "seo_description",
              type: "string",
              title: "Description",
              validation: Rule => Rule.required()
            },
            {
              name: "seo_keywords",
              type: "string",
              title: "Keywords",
              validation: Rule => Rule.required()
            },
            {
              name: "seo_image",
              title: "Image",
              description: "800 x 600 | PNG / JPEG / WEBP | max 100kb",
              type: "image",
              validation: Rule => Rule.required(),
              fields: [
                {
                  title: "Edit Alt Text",
                  name: "name",
                  type: "string",
                  validation: Rule => Rule.required()
                },
              ],
            },
          ],
        },
    ],
    preview: {
      prepare() {
        return {
          title: "Settings"
        }
      }
    }
  }
    