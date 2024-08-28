import QuillEditor, { type EditorProps } from './editor/quill-editor';
import { QuillToolbar } from './toolbar/quill-toolbar';
import type {
  EditorEventHandler,
  SelectionChangeData,
  EditorChangeData,
  TextChangeData,
  FormatChangeData,
  HtmlChangeData,
  DimensionsChangeData,
} from './constants/editor-event';
export default QuillEditor;
export { QuillEditor, QuillToolbar };
export type {
  EditorProps,
  EditorEventHandler,
  SelectionChangeData,
  EditorChangeData,
  TextChangeData,
  FormatChangeData,
  HtmlChangeData,
  DimensionsChangeData,
};
