import React from 'react'

import { FormField } from '@sanity/base/components'
import { TextArea } from '@sanity/ui'

import { useId } from '@reach/auto-id' // hook to generate unique IDs
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'

const top = React.forwardRef((props, ref) => {
  const {
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    placeholder, // Placeholder text from the schema
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state
    onChange, // Method to handle patch events
  } = props

  // Creates a unique ID for our input
  const inputId = useId()

  // Creates a change handler for patching data
  const handleChange = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value // get current value
      // if the value exists, set the data, if not, unset the data
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
    },
    [onChange],
  )

  return (
    <FormField
      description={type.description} // Creates description from schema
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
      compareValue={compareValue} // Handles "edited" status
      inputId={inputId} // Allows the label to connect to the input field
    >
      <TextArea
        id={inputId} // A unique ID for this input
        onChange={handleChange} // A function to call when the input value changes
        value={value} // Current field value
        readOnly={readOnly} // If "readOnly" is defined make this field read only
        placeholder={placeholder} // If placeholder is defined, display placeholder text
        onFocus={onFocus} // Handles focus events
        onBlur={onBlur} // Handles blur events
        ref={ref}
        style={{ height: "150px" }}
      />
    </FormField>
  )
})

export default {
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
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
          },
          {
            name: "seo_keywords",
            type: "string",
            title: "Keywords",
          },
          {
            name: "seo_image",
            title: "Image",
            description: "800 x 600 | PNG / JPEG / WEBP | max 100kb",
            type: "image",
            fields: [
              {
                title: "Edit Alt Text",
                name: "name",
                type: "string",
              },
            ],
          },
        ],
      },
      {
        name: 'top',
        title: 'Description',
        type: 'string',
        inputComponent: top,
        validation: Rule => Rule.required()
      },
      {
        name: 'footer',
        title: 'Footer',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        title: 'Set Text Color',
        name: 'textColor',
        type: 'color',
      },
  ],
  preview: {
    prepare() {
      return {
        title: "Projects"
      }
    }
  },
}
