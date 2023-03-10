import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Editor as ByteMdEditor, EditorProps } from "@bytemd/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gfmPluin from "@bytemd/plugin-gfm";
import highlightPlugin from "@bytemd/plugin-highlight-ssr";
import mathPlugin from "@bytemd/plugin-math-ssr";
import { Router, useRouter } from "next/router";
import debounce from "lodash.debounce";
import { db, WrightIDB } from "../../services/dbService";
import { Wright } from "../../types";
import { figCaptionPlugin, pastePlugin } from "../../services/pluginService";
import { useWrightingActions } from "../../contexts/CommandBarHooks/useWrightingActions";
import { useBiteActions } from "../../contexts/CommandBarHooks/useBiteActions";
import { slugify } from "../../utils";

export const Editor = ({
  editorOnSaveHandler = () => {},
  initWright = {},
  onDestory,
}: {
  editorOnSaveHandler: () => void;
  initWright: Wright | WrightIDB;
  onDestory: () => {};
}) => {
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();
  const editorMode = useBreakpointValue({ base: "tab", md: "split" });

  const plugins = useMemo(
    () => [
      pastePlugin({ injectCM: true }),
      figCaptionPlugin(),
      highlightPlugin(),
      gfmPluin(),
      mathPlugin({ katexOptions: { output: "html" } }),
    ],
    []
  );

  const editorOnChange = async (value: string) => {
    if (id) {
      await db.editorContext.update(id, {
        content: value,
        head: value.substring(0, 50),
      });
      editorOnSaveHandler();
    }
  };

  // const fullScreenHandler = () => {
  //   console.log(document.getElementsByClassName("bytemd")?.[0]?.classList);
  // };

  // useEffect(() => {
  //   if (window.cm) {
  //     document.querySelector('.bytemd-toolbar-right > [bytemd-tippy-path="4"]')?.addEventListener("click", fullScreenHandler);
  //   }

  //   return () => {
  //     document.querySelector('.bytemd-toolbar-right > [bytemd-tippy-path="4"]')?.removeEventListener("click", fullScreenHandler);
  //   };
  // }, [id]);

  const debouncedEditorOnChange = useMemo(
    () => debounce(editorOnChange, 500),
    [id]
  );

  useEffect(() => {
    if (initWright) {
      setContent(initWright.content || "");
    }
  }, [initWright]);

  useEffect(() => {
    if (router.isReady && router?.query?.id) {
      setId((router?.query?.id || "") as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    return () => {
      onDestory();
    };
  }, []);

  const exportHandler = () => {
    const blob = new Blob([content || ""], {
      type: "application/text",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(
      (initWright.title || "") + " " + new Date().toDateString()
    )}.md`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  useWrightingActions(exportHandler);
  useBiteActions();

  return (
    <Box>
      <ByteMdEditor
        value={content}
        onChange={async (v) => {
          setContent(v);
          await debouncedEditorOnChange(v);
        }}
        key="editor"
        mode={editorMode as EditorProps["mode"]}
        plugins={plugins}
        editorConfig={{
          theme: "wrighterly-dark",
          mode: {
            name: "gfm",
            highlightFormatting: true,
            fencedCodeBlockHighlighting: false,
            highlightNonStandardPropertyKeywords: false,
          },
        }}
      />
    </Box>
  );
};
