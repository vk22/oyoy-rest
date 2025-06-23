import Youtube from '@tiptap/extension-youtube'

export const CustomYoutube = Youtube.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { class: 'youtube-container' },
      [
        'iframe',
        {
          ...HTMLAttributes,
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: 'true',
        },
      ],
    ]
  },
})
