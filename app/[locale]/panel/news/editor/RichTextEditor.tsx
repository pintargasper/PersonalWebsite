import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';
import NextImage from 'next/image';

interface RichTextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  images: string[];
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onContentChange, images }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsClient(true), 0);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: true }),
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Strike,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const setImage = (src: string) => {
    if (!editor) return;
    editor.chain().focus().setImage({ src }).run();
  };

  const setLink = () => {
    const url = prompt('Vnesi URL povezave:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!isClient) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-2 d-flex flex-wrap gap-2 align-items-center bg-light p-2 rounded shadow-sm">
        {/* Bold */}
        <button type="button" title="Bold" className={editor?.isActive('bold') ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleBold().run()}>
          <span style={{fontWeight: 'bold'}}>B</span>
        </button>
        {/* Italic */}
        <button type="button" title="Italic" className={editor?.isActive('italic') ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <span style={{fontStyle: 'italic'}}>I</span>
        </button>
        {/* Underline */}
        <button type="button" title="Underline" className={editor?.isActive('underline') ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleUnderline().run()}>
          <span style={{textDecoration: 'underline'}}>U</span>
        </button>
        {/* Strike */}
        <button type="button" title="Strike" className={editor?.isActive('strike') ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleStrike().run()}>
          <span style={{textDecoration: 'line-through'}}>S</span>
        </button>
        {/* Headings */}
        <button type="button" title="H1" className={editor?.isActive('heading', { level: 1 }) ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button type="button" title="H2" className={editor?.isActive('heading', { level: 2 }) ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" title="H3" className={editor?.isActive('heading', { level: 3 }) ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        {/* Lists */}
        <button type="button" title="Bullet List" className={editor?.isActive('bulletList') ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <span>&bull; &bull; &bull;</span>
        </button>
        <button type="button" title="Ordered List" className={editor?.isActive('orderedList') ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          <span>1. 2. 3.</span>
        </button>
        {/* Quote */}
        <button type="button" title="Quote" className={editor?.isActive('blockquote') ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
          <span style={{fontFamily: 'serif'}}>&ldquo;</span>
        </button>
        {/* Undo/Redo */}
        <button type="button" title="Undo" className="btn btn-light btn-sm" onClick={() => editor?.chain().focus().undo().run()}>
          <span>&#8630;</span>
        </button>
        <button type="button" title="Redo" className="btn btn-light btn-sm" onClick={() => editor?.chain().focus().redo().run()}>
          <span>&#8631;</span>
        </button>
        {/* Align */}
        <button type="button" title="Align Left" className={editor?.isActive('paragraph', { textAlign: 'left' }) ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
          <span style={{display: 'inline-block', width: 18}}>&#8592;</span>
        </button>
        <button type="button" title="Align Center" className={editor?.isActive('paragraph', { textAlign: 'center' }) ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
          <span style={{display: 'inline-block', width: 18}}>&#8596;</span>
        </button>
        <button type="button" title="Align Right" className={editor?.isActive('paragraph', { textAlign: 'right' }) ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'} onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
          <span style={{display: 'inline-block', width: 18}}>&#8594;</span>
        </button>
      </div>
      {/* Editor */}
      <EditorContent editor={editor} />
      <style>{`
        .ProseMirror img {
          display: inline-block;
          vertical-align: middle;
          max-width: 300px;
        }
        .ProseMirror {
          min-height: 600px;
          font-size: 1.1rem;
          padding: 16px;
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e3e3e3;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .ProseMirror blockquote {
          border-left: 4px solid #007bff;
          padding-left: 12px;
          color: #555;
          background: #f8f9fa;
        }
        .ProseMirror a {
          color: #007bff;
          text-decoration: underline;
        }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 2em;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
