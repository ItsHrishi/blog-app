import { Editor } from "@tinymce/tinymce-react";
import conf from "../../conf/conf";
import { Controller } from "react-hook-form";
import { useRef } from "react";

const RichTextEditor = ({
  name,
  control,
  defaultValue = "",
  trigger,
  setWordCount,
}) => {
  const editorRef = useRef(null);

  // Function to get word count - can be called when needed
  const getWordCount = () => {
    if (editorRef.current) {
      return editorRef.current.plugins.wordcount.getCount();
    }
    return 0;
  };

  return (
    <div className="w-full">
      <Controller
        name={name || "content"}
        control={control}
        rules={{ required: "Content is required" }}
        render={({ field: { onChange } }) => (
          <Editor
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            onBlur={() => {
              trigger("content");
              if (setWordCount) {
                setWordCount(getWordCount());
              }
            }}
            apiKey={conf.tinyMCE}
            initialValue={defaultValue}
            init={{
              height: 500,
              selector: "textarea",
              menubar: false,
              branding: false,
              paste_as_text: true, // Forces pasting as plain text
              paste_data_images: false, // Removes images from paste
              paste_remove_styles_if_webkit: true,
              paste_strip_class_attributes: "all",
              paste_remove_styles: true,
              paste_text_sticky: true,
              paste_text_sticky_default: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "table",
                "wordcount",
                "codesample",
                "emoticons",
              ],
              toolbar1:
                "undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | styles |" +
                "link table charmap emoticons codesample | preview code | removeformat",
              toolbar2:
                "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | | hr | ",
              codesample_languages: [
                { text: "HTML/XML", value: "html" },
                { text: "JavaScript", value: "javascript" },
                { text: "CSS", value: "css" },
                { text: "Python", value: "python" },
                { text: "Java", value: "java" },
              ],
              formats: {
                terminal: { block: "div", classes: "terminal" },
              },
              //Added quickbars for quick formatting
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote | formatselect | removeformat",
              quickbars_insert_toolbar: false,
              content_style:
                "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;
