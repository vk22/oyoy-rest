<template>
  <div>
    <div v-if="editor">
      <button class="tiptap-btn" @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        code
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        undo
      </button>
      <button class="tiptap-btn" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        redo
      </button>
    </div>
    <TiptapEditorContent :editor="editor" class="textarea"/>
  </div>
</template>

<script setup>
import { watch } from 'vue'
const props = defineProps({
  modelValue: String
})
const emit = defineEmits({
  'update:modelValue': String
})
const editor = useEditor({
  content: props.modelValue,
  extensions: [TiptapStarterKit],
  onUpdate: () => {
        // HTML
        emit('update:modelValue', editor.value.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});

watch(() => props.modelValue, (value) => {
  const isSame = editor.value.getHTML() === value
      if (isSame) {
        return
      }
      editor.value.commands.setContent(value, false)
    });
</script>

<style lang="scss">

.tiptap {
  border: 1px solid #a4a4a4;
  padding: 10px;

  p {
    margin-bottom: 0;;
  }
}

.tiptap-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 4px;
  margin: 1px;
  border: 1px solid #bbb;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: none;
  letter-spacing: 0px;
  color: #111;
  cursor: pointer;
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: ease-out;
  border-radius: 4px;
  background-color: #fff;

  .icon {
    font-size: 16px;
    line-height: 14px;
    font-weight: 300;
    margin-right: 8px;
  }

  &:hover {
    background-color: #e3e3e3;
    color: #111;
  }
}

</style>