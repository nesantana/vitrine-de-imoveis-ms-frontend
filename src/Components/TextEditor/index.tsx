import React, { useEffect, useMemo } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Flex, Icon } from '@chakra-ui/react'

import {
  BiBold, BiItalic, BiListOl,
  BiListUl, BiParagraph, BiRedo, BiStrikethrough, BiUndo,
} from 'react-icons/bi'

const MenuBar: React.FC<any> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('bold') ? 'gray.900' : 'gray.100'}
          color={editor.isActive('bold') ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Icon as={BiBold} />
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          bg={editor.isActive('italic') ? 'gray.900' : 'gray.100'}
          color={editor.isActive('italic') ? 'white' : 'gray.900'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icon as={BiItalic} />
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('strike') ? 'gray.900' : 'gray.100'}
          color={editor.isActive('strike') ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icon as={BiStrikethrough} />
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('paragraph') ? 'gray.900' : 'gray.100'}
          color={editor.isActive('paragraph') ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Icon as={BiParagraph} />
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('heading', { level: 1 }) ? 'gray.900' : 'gray.100'}
          color={editor.isActive('heading', { level: 1 }) ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('heading', { level: 2 }) ? 'gray.900' : 'gray.100'}
          color={editor.isActive('heading', { level: 2 }) ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('heading', { level: 3 }) ? 'gray.900' : 'gray.100'}
          color={editor.isActive('heading', { level: 3 }) ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('heading', { level: 4 }) ? 'gray.900' : 'gray.100'}
          color={editor.isActive('heading', { level: 4 }) ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          H4
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('heading', { level: 5 }) ? 'gray.900' : 'gray.100'}
          color={editor.isActive('heading', { level: 5 }) ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        >
          H5
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('heading', { level: 6 }) ? 'gray.900' : 'gray.100'}
          color={editor.isActive('heading', { level: 6 }) ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        >
          H6
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('bulletList') ? 'gray.900' : 'gray.100'}
          color={editor.isActive('bulletList') ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <Icon as={BiListUl} />
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg={editor.isActive('orderedList') ? 'gray.900' : 'gray.100'}
          color={editor.isActive('orderedList') ? 'white' : 'gray.900'}
          borderRadius="5px"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <Icon as={BiListOl} />
        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg="gray.100"
          color="gray.900"
          borderRadius="5px"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Icon as={BiUndo} />

        </Flex>
        <Flex
          height="50px"
          flex="1"
          justifyContent="center"
          alignItems="center"
          bg="gray.100"
          color="gray.900"
          borderRadius="5px"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Icon as={BiRedo} />

        </Flex>
      </Flex>
    </>
  )
}

export const TextEditor: React.FC<any> = ({ setState, state }) => {
  const editor: any = useEditor({
    extensions: [
      StarterKit,
    ],
    content: null,
    onUpdate: (e) => setState(e.editor),
  })

  useEffect(() => {
    if (editor && editor.commands && editor.isEmpty) {
      editor.commands.setContent(state)
    }
  }, [state])

  return (
    <Box border="1px" borderRadius="5px" overflow="hidden">
      <Box bg="gray.100">
        <MenuBar editor={editor} />
      </Box>

      {editor && (
      <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <Flex bg="gray.900" color="white" shadow="lg" borderRadius="5px" overflow="hidden">
          <Box
            p="5px 20px"
            bg={editor.isActive('bold') ? 'gray.800' : 'gray.900'}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </Box>
          <Box
            p="5px 20px"
            bg={editor.isActive('italic') ? 'gray.800' : 'gray.900'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </Box>
          <Box
            p="5px 20px"
            bg={editor.isActive('strike') ? 'gray.800' : 'gray.900'}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            Strike
          </Box>
        </Flex>
      </BubbleMenu>
      )}

      <Box maxHeight="300px" overflow="auto" padding="20px">
        <EditorContent editor={editor} className="editor" />
      </Box>
    </Box>
  )
}
