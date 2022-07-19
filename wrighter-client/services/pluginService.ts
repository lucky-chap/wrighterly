// @ts-ignore
import remarkFigureCaption from "@microflash/remark-figure-caption";
import type { BytemdPlugin } from "bytemd";
import { turndownService } from "../services/turndownService";

export const pastePlugin = (): BytemdPlugin => {
  return {
    remark: (processor) => processor.use(remarkFigureCaption),
    editorEffect(ctx) {
      if (window) {
        console.log("cm window set");
        window["cm"] = ctx.editor;
      }
      ctx.editor.on("copy", (cm, event) => {
        if (cm.getSelection()) {
          event.clipboardData?.setData("text/plain", turndownService.escape(cm.getSelection()));
        }
      });
      ctx.editor.on("paste", (cm, event) => {
        // event.preventDefault();
        if (event) {
          const htmlText = event?.clipboardData?.getData("text/html") || "";
          const normalText = event?.clipboardData?.getData("text/plain") || "";

          const finalTextToPaste = (() => {
            const token = ctx.editor.getTokenAt(ctx.editor.getCursor());
            if (token.state?.overlay?.code || token.state?.overlay?.codeBlock) {
              return normalText;
            }
            if (htmlText.trim().length > 0) {
              return turndownService.turndown(htmlText);
            }

            return normalText;
          })();

          if (!cm.somethingSelected()) {
            cm.replaceRange(finalTextToPaste, cm.getCursor());
          } else {
            cm.replaceSelection(finalTextToPaste);
          }
        }
        event.preventDefault();
      });

      return () => {
        if (window) {
          window.cm = null;
        }
      };
    },
  };
};
