import { Editor } from "@tinymce/tinymce-react";
import conf from "../../conf/conf";
import { Controller } from "react-hook-form";

const RichTextEditor = ({ name, control, defaultValue = "", trigger }) => {
  return (
    <div className="w-full">
      <Controller
        name={name || "content"}
        control={control}
        rules={{ required: "Content is required" }}
        render={({ field: { onChange } }) => (
          <Editor
            onBlur={() => trigger("content")}
            apiKey={conf.tinyMCE}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: false, // Menu bar is explicitly set to false
              branding: false,
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
                "hr", // Added hr plugin
              ],
              toolbar1:
                "undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | styles |" +
                "link table charmap emoticons codesample | fullscreen preview code | removeformat",
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
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;
